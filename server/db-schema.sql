CREATE TABLE public.expense (
    noteid character varying(50),
    expenseid character varying(50),
    reason character varying(100),
    amount numeric(10,0),
    expensedate date,
    roomid character varying(50)
);

CREATE TABLE public.note (
    id character varying(50),
    name character varying(50),
    roomid character varying(50),
    adminid character varying(50),
    creationdate date
);

CREATE TABLE public.room (
    id character varying(50),
    name character varying(50),
    description character varying(100),
    adminid character varying(50)
);

CREATE TABLE public.roomMember (
    roomid character varying(50),
    memberid character varying(50),
    status boolean
);

CREATE TABLE public."user" (
    name character varying,
    email character varying,
    password character varying,
    image character varying,
    editFlag character varying(10),
    id character varying(50),
    bio text
);

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) with time zone NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
);
