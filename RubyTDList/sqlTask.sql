tables:
  tasks (id, name, status, project_id)
  projects (id, name)

--1. get all statuses, not repeating, alphabetically ordered
	select distinct status from tasks order by status;

--2. get the count of all tasks in each project, order by tasks count descending
	select project_id, count(*) from tasks t group by t.project_id order by 2 desc;
	
--3. get the count of all tasks in each project, order by projects names
	select p.name, count(*) from tasks t join projects p on t.project_id = p.id group by name order by name ;
	
--4. get the tasks for all projects having the name beginning with “N” letter
	select t.* from tasks t where t.name like 'N%';

--5. get the list of all projects containing the ‘a’ letter in the middle of the name, and
--show the tasks count near each project. Mention that there can exist projects without
--tasks and tasks with project_id=NULL
	select p.name project, count(t.project_id) from tasks t full join projects p on t.project_id = p.id 
	where (p.name like '%a%' and p.name not like 'a%' and p.name not like '%a') group by p.name; 

--6. get the list of tasks with duplicate names. Order alphabetically
	select * from tasks where lower(name) in (
		select lower(name) from tasks group by lower(name) having count(name)>1)
	order by lower(name);
	
--7. get the list of tasks having several exact matches of both name and status, from
--the project ‘Garage’. Order by matches count
	select t1.name, count(*) from tasks t1 join projects p on t1.project_id = p.id 
	where p.name = 'GARAGE' and exists (
		select 1 from tasks t2 where t1.name = t2.name and t1.project_id = t2.project_id and t1.id <> t2.id)
	group by t1.name order by count(*);
		

--8. get the list of project names having more than 10 tasks in status ‘completed’. Order by project_id
	select name from (
	select p.name, t.project_id from tasks t join projects p on t.project_id = p.id where status = 'completed'
	group by p.name, t.project_id
	having count(*) > 9
	order by project_id);