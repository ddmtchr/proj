insert into users (username, password, role)
values ('Vasya', '$2a$10$xAs2b5GcxHECcuRXFyF8w.ho1pcsR8UEHETEQEPL34wxKPp7Wg8cS', 'ROLE_EMPLOYEE'),
       ('HR', '$2a$10$RY1jy4kTAVQFH2/lC7DU.e8FvIKkeg7tb2qq1LjQH1uFpzkZztgiK', 'ROLE_HR'),
       ('Serge', '$2a$10$q6oDHJT9YvwxHGGQzKjoYO75o/BiAxIU4zb/5LdfKksc/VELBFmhm', 'ROLE_EMPLOYEE');

insert into employee (user_id, full_name, birth_date, phone, email, position, level, status, department, vacation_days,
                      salary, employment_date, dismissal_reason, dismissal_date)
values (1, 'Прохоров Василий Алексеевич', '2000-02-03', '+79123456789', 'vasya@example.com', 'Java Backend', 'MIDDLE',
        'PERMANENT_EMPLOYEE', 'Backend', 14, 210000, '2022-10-01', null, null),
       (2, 'Иванова Дарья Александровна', '1998-10-23', '+79234567890', 'dasha@example.com', 'HR Manager', 'JUNIOR',
        'PERMANENT_EMPLOYEE', 'HR', 21, 65000, '2024-05-01', null, null),
       (3, 'Клименков Сергей Викторович', '1976-04-23', '+79345678901', 'serge@example.com', 'QA Automation Engineer',
        'LEAD', 'ON_PROBATION', 'Backend', 0, 285000, '2024-11-21', null, null);

insert into vacation (employee_id, request_date, start_date, end_date, status, rejection_reason)
values (1, '2023-01-15', '2023-02-01', '2023-02-15', 'FINISHED', null),
       (1, '2024-11-15', '2024-12-25', '2025-01-16', 'PENDING', null),
       (3, '2024-11-22', '2024-11-23', '2025-02-15', 'REJECTED', 'А работать кто будет?');

insert into vacancy (title, description, salary, status, posted_date, closed_date, department)
values ('Middle Frontend разработчик',
        'Для нас важно в кандидате: Опыт от 2-х лет, JavaScript, React, Html, CSS, Git (rebase, merge, cherry-pick etc), Работа с макетами Figma, Скилл адаптивной и кросс-браузерной верстки',
        120000, 'OPEN', '2024-11-29', null, 'Frontend'),
       ('Системный аналитик',
        'Рассматриваем кандидатов с: Опытом работы в качестве системного аналитика от двух лет. Знанием нотаций UML и BPMN. Пониманием клиент-серверного взаимодействия.',
        175000, 'OPEN', '2024-11-27', null, 'Business');

insert into candidate (full_name, phone, email, status, vacancy_id)
values ('Николаев Владимир Вячеславович', '+78901238736', 'nikolaev@example.com', 'SENT_CV', 2),
       ('Осипов Святослав Владимирович', '+74568245826', 'osipov@example.com', 'PENDING_TEST_TASK', 2),
       ('Смолин Артем Александрович', '+78507295825', 'smolin@example.com', 'PENDING_INTERVIEW', 2),
       ('Пенской Александр Владимирович', '+79175931940', 'penskoi@example.com', 'REJECTED_OFFER', 2),
       ('Балканский Андрей Александрович', '+79122673084', 'balkanskii@example.com', 'REJECTED_INTERVIEW', 1),
       ('Кугаевских Александр Владимирович', '+79027561029', 'kugaevskikh@example.com', 'SENT_CV', 1);

