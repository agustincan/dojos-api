INSERT INTO public.school (id, "name", address, "parentId", "typeId") VALUES(1, 'Escuela 1', NULL, NULL, NULL);
INSERT INTO public.school (id, "name", address, "parentId", "typeId") VALUES(2, 'Escuela 2', NULL, NULL, NULL);
INSERT INTO public.school (id, "name", address, "parentId", "typeId") VALUES(3, 'Escuela 3', NULL, NULL, NULL);

INSERT INTO public.school_type (id, "name", "isActive") VALUES(1, 'Aikido', true);
INSERT INTO public.school_type (id, "name", "isActive") VALUES(2, 'Karate', true);
INSERT INTO public.school_type (id, "name", "isActive") VALUES(3, 'Jujitsu', true);

INSERT INTO public.student_type (id, "name", "isActive") VALUES(0, 'Otro', true);
INSERT INTO public.student_type (id, "name", "isActive") VALUES(1, 'Estudiante', true);
INSERT INTO public.student_type (id, "name", "isActive") VALUES(2, 'Instructor', true);

INSERT INTO public.user_role (id, "name", "isActive") VALUES(1, 'administrador', true);
INSERT INTO public.user_role (id, "name", "isActive") VALUES(2, 'instructor', true);
INSERT INTO public.user_role (id, "name", "isActive") VALUES(3, 'estudiante', true);
INSERT INTO public.user_role (id, "name", "isActive") VALUES(4, 'superuser', true);

INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(1, '5° Kyu', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(2, '4° Kyu', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(3, '3° Kyu', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(4, '2° Kyu', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(5, '1° Kyu', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(6, '1° Dan', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(7, '2° Dan', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(8, '3° Dan', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(9, '4° Dan', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(10, '5° Dan', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(11, '6° Dan', true, NULL);
INSERT INTO public.graduation (id, "name", "isActive", "typeId") VALUES(12, '7° Dan', true, NULL);


