import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/manageJobs.css';

const ManageJobs = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(job),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Job updated successfully');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    if (loading) {
        return <p>Loading job details...</p>;
    }

    if (!job) {
        return <p>Job not found</p>;
    }

    return (
        <div className="manage-jobs">
            <h1>Manage Job</h1>
            <div className="job-details">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={job.title} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={job.description} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input type="text" name="role" value={job.role} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <input type="text" name="department" value={job.department} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="workLocation" value={job.workLocation} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Salary Min:</label>
                    <input type="number" name="salaryRangeMin" value={job.salaryRange?.min || ''} onChange={(e) => handleInputChange({ target: { name: 'salaryRange', value: { ...job.salaryRange, min: e.target.value } } })} />
                </div>
                <div className="form-group">
                    <label>Salary Max:</label>
                    <input type="number" name="salaryRangeMax" value={job.salaryRange?.max || ''} onChange={(e) => handleInputChange({ target: { name: 'salaryRange', value: { ...job.salaryRange, max: e.target.value } } })} />
                </div>
                <div className="form-group">
                    <label>Remote:</label>
                    <input type="checkbox" name="remote" checked={job.remote || false} onChange={(e) => handleInputChange({ target: { name: 'remote', value: e.target.checked } })} />
                </div>
                <div className="form-group">
                    <label>Benefits:</label>
                    <input type="text" name="benefits" value={job.benefits?.join(', ') || ''} onChange={(e) => handleInputChange({ target: { name: 'benefits', value: e.target.value.split(', ') } })} />
                </div>
                <div className="form-group">
                    <label>Company Culture:</label>
                    <input type="text" name="companyCulture" value={job.companyCulture} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Application Deadline:</label>
                    <input type="date" name="applicationDeadline" value={job.applicationDeadline?.split('T')[0] || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Experience Level:</label>
                    <input type="text" name="experienceLevel" value={job.experienceLevel} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                <label>Education Level:</label>
                    <input type="text" name="educationLevel" value={job.educationLevel} onChange={handleInputChange} />
                </div>
 <div className="form-group">
                    <label>Industry:</label>
                    <input type="text" name="industry" value={job.industry} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Keywords:</label>
                    <input type="text" name="keywords" value={job.keywords?.join(', ') || ''} onChange={(e) => handleInputChange({ target: { name: 'keywords', value: e.target.value.split(', ') } })} />
                </div>
                <div className="form-group">
                    <label>Contact Email:</label>
                    <input type="email" name="contactEmail" value={job.contactEmail} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Company Website:</label>
                    <input type="url" name="companyWebsite" value={job.companyWebsite} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Job Responsibilities:</label>
                    <textarea name="jobResponsibilities" value={job.jobResponsibilities?.join('\n') || ''} onChange={(e) => handleInputChange({ target: { name: 'jobResponsibilities', value: e.target.value.split('\n') } })} />
                </div>
                <div className="form-group">
                    <label>Languages Required:</label>
                    <input type="text" name="languagesRequired" value={job.languagesRequired?.join(', ') || ''} onChange={(e) => handleInputChange({ target: { name: 'languagesRequired', value: e.target.value.split(', ') } })} />
                </div>
                <div className="form-actions">
                    <button onClick={handleSave}>Save Changes</button>
                </div>
            </div>
            <div className="job-actions">
                <button onClick={() => navigate(`/shortlist/${job._id}`)}>Shortlist Candidates</button>
                <button onClick={() => navigate(`/schedule-interview/${job._id}`)}>Schedule Interview</button>
                <button onClick={() => navigate(`/manage-assesment/${job._id}`)}>Take Assessment</button>
            </div>
        </div>
    );
};

export default ManageJobs;