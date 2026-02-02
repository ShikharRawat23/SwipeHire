def calculate_match_score(resume_skills, job_skills):
    if not resume_skills or not job_skills:
        return 0

    resume_set = {
        skill.strip().lower()
        for skill in resume_skills.split(",")
    }

    job_set = {
        skill.strip().lower()
        for skill in job_skills.split(",")
    }

    return len(resume_set & job_set)
