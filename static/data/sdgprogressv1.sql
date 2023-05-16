--
-- PostgreSQL database dump
--

-- Dumped from database version 13.10
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: goals; Type: TABLE; Schema: public; Owner: taiyo.s-k
--

CREATE TABLE public.goals (
    code integer NOT NULL,
    title character varying(200),
    description text,
    uri character varying(20)
);


ALTER TABLE public.goals OWNER TO "taiyo.s-k";

--
-- Name: goals_code_seq; Type: SEQUENCE; Schema: public; Owner: taiyo.s-k
--

CREATE SEQUENCE public.goals_code_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goals_code_seq OWNER TO "taiyo.s-k";

--
-- Name: goals_code_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taiyo.s-k
--

ALTER SEQUENCE public.goals_code_seq OWNED BY public.goals.code;


--
-- Name: progress_data; Type: TABLE; Schema: public; Owner: taiyo.s-k
--

CREATE TABLE public.progress_data (
    id integer NOT NULL,
    code integer,
    years_to_date double precision,
    progress double precision,
    deadline integer
);


ALTER TABLE public.progress_data OWNER TO "taiyo.s-k";

--
-- Name: progress_data_id_seq; Type: SEQUENCE; Schema: public; Owner: taiyo.s-k
--

CREATE SEQUENCE public.progress_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.progress_data_id_seq OWNER TO "taiyo.s-k";

--
-- Name: progress_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taiyo.s-k
--

ALTER SEQUENCE public.progress_data_id_seq OWNED BY public.progress_data.id;


--
-- Name: goals code; Type: DEFAULT; Schema: public; Owner: taiyo.s-k
--

ALTER TABLE ONLY public.goals ALTER COLUMN code SET DEFAULT nextval('public.goals_code_seq'::regclass);


--
-- Name: progress_data id; Type: DEFAULT; Schema: public; Owner: taiyo.s-k
--

ALTER TABLE ONLY public.progress_data ALTER COLUMN id SET DEFAULT nextval('public.progress_data_id_seq'::regclass);


--
-- Data for Name: goals; Type: TABLE DATA; Schema: public; Owner: taiyo.s-k
--

COPY public.goals (code, title, description, uri) FROM stdin;
1	End poverty in all its forms everywhere	Goal 1 calls for an end to poverty in all its manifestations, including extreme poverty, over the next 15 years. All people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits.	/v1/sdg/Goal/1
2	End hunger, achieve food security and improved nutrition and promote sustainable agriculture	Goal 2 seeks to end hunger and all forms of malnutrition and to achieve sustainable food production by 2030. It is premised on the idea that everyone should have access to sufficient nutritious food, which will require widespread promotion of sustainable agriculture, a doubling of agricultural productivity, increased investments and properly functioning food markets.	/v1/sdg/Goal/2
3	Ensure healthy lives and promote well-being for all at all ages	Goal 3 aims to ensure health and well-being for all at all ages by improving reproductive, maternal and child health; ending the epidemics of major communicable diseases; reducing non-communicable and environmental diseases; achieving universal health coverage; and ensuring access to safe, affordable and effective medicines and vaccines for all.	/v1/sdg/Goal/3
4	Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all	Goal 4 focuses on the acquisition of foundational and higher-order skills; greater and more equitable access to technical and vocational education and training and higher education; training throughout life; and the knowledge, skills and values needed to function well and contribute to society.	/v1/sdg/Goal/4
5	Achieve gender equality and empower all women and girls	Goal 5 aims to empower women and girls to reach their full potential, which requires eliminating all forms of discrimination and violence against them, including harmful practices. It seeks to ensure that they have every opportunity for sexual and reproductive health and reproductive rights; receive due recognition for their unpaid work; have full access to productive resources; and enjoy equal participation with men in political, economic and public life.	/v1/sdg/Goal/5
6	Ensure availability and sustainable management of water and sanitation for all	Goal 6 goes beyond drinking water, sanitation and hygiene to also address the quality and sustainability of water resources. Achieving this Goal, which is critical to the survival of people and the planet, means expanding international cooperation and garnering the support of local communities in improving water and sanitation management.	/v1/sdg/Goal/6
7	Ensure access to affordable, reliable, sustainable and modern energy for all	Goal 7 seeks to promote broader energy access and increased use of renewable energy, including through enhanced international cooperation and expanded infrastructure and technology for clean energy.	/v1/sdg/Goal/7
8	Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all	Goal 8 aims to provide opportunities for full and productive employment and decent work for all while eradicating forced labour, human trafficking and child labour.	/v1/sdg/Goal/8
9	Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation	Goal 9 focuses on the promotion of infrastructure development, industrialization and innovation. This can be accomplished through enhanced international and domestic financial, technological and technical support, research and innovation, and increased access to information and communication technology.	/v1/sdg/Goal/9
10	Reduce inequality within and among countries	Goal 10 calls for reducing inequalities in income, as well as those based on sex, age, disability, race, class, ethnicity, religion and opportunity—both within and among countries. It also aims to ensure safe, orderly and regular migration and addresses issues related to representation of developing countries in global decision-making and development assistance.	/v1/sdg/Goal/10
11	Make cities and human settlements inclusive, safe, resilient and sustainable	Goal 11 aims to renew and plan cities and other human settlements in a way that fosters community cohesion and personal security while stimulating innovation and employment.	/v1/sdg/Goal/11
12	Ensure sustainable consumption and production patterns	Goal 12 aims to promote sustainable consumption and production patterns through measures such as specific policies and international agreements on the management of materials that are toxic to the environment.	/v1/sdg/Goal/12
13	Take urgent action to combat climate change and its impacts	Climate change presents the single biggest threat to development, and its widespread, unprecedented effects disproportionately burden the poorest and the most vulnerable. Urgent action is needed not only to combat climate change and its impacts, but also to build resilience in responding to climate-related hazards and natural disasters.	/v1/sdg/Goal/13
14	Conserve and sustainably use the oceans, seas and marine resources for sustainable development	Goal 14 seeks to promote the conservation and sustainable use of marine and coastal ecosystems, prevent marine pollution and increase the economic benefits to small island developing States and LDCs from the sustainable use of marine resources.	/v1/sdg/Goal/14
15	Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss	Goal 15 focuses on managing forests sustainably, restoring degraded lands and successfully combating desertification, reducing degraded natural habitats and ending biodiversity loss. All of these efforts in combination will help ensure that livelihoods are preserved for those that depend directly on forests and other ecosystems, that biodiversity will thrive, and that the benefits of these natural resources will be enjoyed for generations to come.	/v1/sdg/Goal/15
16	Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels	Goal 16 envisages peaceful and inclusive societies based on respect for human rights, the rule of law, good governance at all levels, and transparent, effective and accountable institutions. Many countries still face protracted violence and armed conflict, and far too many people are poorly supported by weak institutions and lack access to justice, information and other fundamental freedoms.	/v1/sdg/Goal/16
17	Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development	The 2030 Agenda requires a revitalized and enhanced global partnership that mobilizes all available resources from Governments, civil society, the private sector, the United Nations system and other actors. Increasing support to developing countries, in particular LDCs, landlocked developing countries and small island developing States is fundamental to equitable progress for all.	/v1/sdg/Goal/17
\.


--
-- Data for Name: progress_data; Type: TABLE DATA; Schema: public; Owner: taiyo.s-k
--

COPY public.progress_data (id, code, years_to_date, progress, deadline) FROM stdin;
1	1	3.7525742309740378	39.119170984455955	15
2	2	4.893170386910756	48.54070625411455	15
3	3	3.8459326883829585	69.4816007252216	15
4	4	3.827687532687347	42.87234042553191	15
5	5	2.2735426548848503	18.585918794749404	15
6	6	4.687785509748457	70.04685408299866	15
7	7	6.6	88.39378238341968	15
8	8	4.8072592517299935	53.0440414507772	15
9	9	5.474183138688262	64.42436412315931	15
10	10	4.96275846659567	48.24468085106383	15
11	11	2.5664794844849337	22.999423834196893	15
12	12	3.3919998362740587	38.78944870466321	15
13	13	1.365895631298456	12.020725388601036	15
14	14	3.229659109263532	33.547695605573416	15
15	15	4.098690061296861	56.476683937823836	15
16	16	2.8790951286259916	21.340835481023827	15
17	17	4.990199954533431	61.98865282173783	15
\.


--
-- Name: goals_code_seq; Type: SEQUENCE SET; Schema: public; Owner: taiyo.s-k
--

SELECT pg_catalog.setval('public.goals_code_seq', 1, false);


--
-- Name: progress_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taiyo.s-k
--

SELECT pg_catalog.setval('public.progress_data_id_seq', 17, true);


--
-- Name: goals goals_pkey; Type: CONSTRAINT; Schema: public; Owner: taiyo.s-k
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (code);


--
-- Name: progress_data progress_data_pkey; Type: CONSTRAINT; Schema: public; Owner: taiyo.s-k
--

ALTER TABLE ONLY public.progress_data
    ADD CONSTRAINT progress_data_pkey PRIMARY KEY (id);


--
-- Name: progress_data progress_data_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taiyo.s-k
--

ALTER TABLE ONLY public.progress_data
    ADD CONSTRAINT progress_data_code_fkey FOREIGN KEY (code) REFERENCES public.goals(code);


--
-- PostgreSQL database dump complete
--

