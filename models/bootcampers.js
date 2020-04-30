const { query } = require("../db/index");

async function getBootcamperByName(name) {
  const data = await query(
    `SELECT uid,
    email,
    photourl,
    first_name,
    surname,
    aboutme,
    job_title,
    company_name,
    salary,
    start_date,
    previous_roles,
    cohort_num,
    region,
    job_satisfaction,
    new_job,
    bootcampers.twitter,
    github,
    portfolio,
    bootcampers.linkedin FROM companies INNER JOIN bootcampers ON bootcampers.company_id = companies.company_id WHERE first_name ILIKE '%' || $1 || '%'`,
    [name]
  );
  console.log(`GET: getbootcampername Results:${data.rows} `);
  return data.rows;
}

async function getBootcamperByCompanyId(companyid) {
  const data = await query(
    `SELECT uid,
    email,
    photourl, 
    first_name,
    surname,
    aboutme,
    job_title,
    company_name,
    salary,
    start_date,
    previous_roles,
    cohort_num,
    region,
    job_satisfaction,
    new_job,
    bootcampers.twitter,
    github,
    portfolio,
    bootcampers.linkedin FROM companies INNER JOIN bootcampers ON bootcampers.company_id = companies.company_id WHERE companies.company_id = $1`,
    [companyid]
  );
  console.log(`GET: getbootcamperbycompanyID Results:${data.rows} `);
  return data.rows;
}

async function getBootcamperByRegion(region) {
  const data = await query(
    `SELECT first_name,
    surname,
    job_title,
    company_name,
    region FROM companies INNER JOIN bootcampers ON bootcampers.company_id = companies.company_id WHERE region ILIKE '%' || $1 || '%'`,
    [region]
  );
  console.log(`GET: getBootcamperByRegion Results:${data.rows} `);
  return data.rows;
}

async function getBootcamperByJobTitle(jobtitle) {
  const data = await query(
    `SELECT first_name,
    surname,
    job_title,
    company_name FROM companies INNER JOIN bootcampers ON bootcampers.company_id = companies.company_id WHERE job_title ILIKE '%' || $1 || '%'`,
    [jobtitle]
  );
  console.log(`GET: getBootcamperByJobTitle Results:${data.rows} `);
  return data.rows;
}

async function createBootcamper({
  uid,
  email,
  photourl,
  first_name,
  surname,
  aboutme,
  job_title,
  company_id,
  salary,
  start_date,
  previous_roles,
  cohort_num,
  region,
  job_satisfaction,
  new_job,
  twitter,
  github,
  portfolio,
  linkedin,
}) {
  const res = await query(
    `INSERT INTO bootcampers(
      uid,
      email,
      photourl,
      first_name,
      surname,
      aboutme,
      job_title,
      company_id,
      salary,
      start_date,
      previous_roles,
      cohort_num,
      region,
      job_satisfaction,
      new_job,
      twitter,
      github,
      portfolio,
      linkedin) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING first_name`,
    [
      uid,
      email,
      photourl,
      first_name,
      surname,
      aboutme,
      job_title,
      company_id,
      salary,
      start_date,
      previous_roles,
      cohort_num,
      region,
      job_satisfaction,
      new_job,
      twitter,
      github,
      portfolio,
      linkedin,
    ]
  );
  console.log(`Log: createBootcamper result ${res}`);
  return `This has created a new bootcamper profile for name -> need to change this: ${res}`;
}

async function updateBootcamper(body, id) {
  const {
    uid,
    email,
    photourl,
    first_name,
    surname,
    aboutme,
    job_title,
    company_id,
    salary,
    start_date,
    previous_roles,
    cohort_num,
    region,
    job_satisfaction,
    new_job,
    twitter,
    github,
    portfolio,
    linkedin,
  } = body;
  const res = await query(
    `UPDATE bootcampers SET
    uid = COALESCE($1, uid),
    email = COALESCE($2, email),
    photourl = COALESCE($3, photo),
    first_name = COALESCE($4, first_name),
    surname = COALESCE($5, surname),
    aboutme = COALESCE($6, aboutme),
    job_title = COALESCE($7, job_title),
    company_id = COALESCE($8, company_id),
    salary = COALESCE($9, salary),
    start_date = COALESCE($10, start_date),
    previous_roles = COALESCE($11, previous_roles),
    cohort_num = COALESCE($12, cohort_num),
    region = COALESCE($13, region),
    job_satisfaction = COALESCE($14, job_satisfaction),
    new_job = COALESCE($15, new_job),
    twitter = COALESCE($16, twitter),
    github = COALESCE($17, github),
    portfolio = COALESCE($18, portfolio),
    linkedin = COALESCE($19, linkedin) WHERE bootcamper_id = $20 RETURNING first_name`,
    [
      uid,
      email,
      photourl,
      first_name,
      surname,
      aboutme,
      job_title,
      company_id,
      salary,
      start_date,
      previous_roles,
      cohort_num,
      region,
      job_satisfaction,
      new_job,
      twitter,
      github,
      portfolio,
      linkedin,
      id,
    ]
  );
  console.log(`log updateBootcamper complete`);
  return res.rows;
}

async function deleteBootcamper(id) {
  const res = await query(
    `DELETE FROM bootcampers WHERE bootcamper_id=$1 RETURNING first_name`,
    [id]
  );
  console.log(`log: bootcamper has been deleted`);
  return res.rows;
}

module.exports = {
  getBootcamperByName,
  getBootcamperByCompanyId,
  getBootcamperByRegion,
  getBootcamperByJobTitle,
  createBootcamper,
  updateBootcamper,
  deleteBootcamper,
};
