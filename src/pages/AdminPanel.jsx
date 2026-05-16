import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Plus, Save, X, FileText, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDev, setEditingDev] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadingFor, setUploadingFor] = useState(null);

  const defaultDev = {
    talentId: '', name: '', title: '', price: 25, partTime: false, fullTime: true,
    years: 0, skillHeading: '', bio: '', skills: [], experience: 0, verified: true, showFullName: false, resumeUrl: '',
    projects: [], education: []
  };

  const [formData, setFormData] = useState(defaultDev);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/developers');
      const data = await res.json();
      setDevelopers(data);
    } catch (error) {
      toast.error('Failed to fetch developers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this developer?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/developers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Developer deleted');
        fetchDevelopers();
      } else {
        toast.error('Failed to delete developer');
      }
    } catch (error) {
      toast.error('Error deleting developer');
    }
  };

  const handleEdit = (dev) => {
    setEditingDev(dev);
    setFormData({ 
      ...dev, 
      skills: dev.skills ? dev.skills.join(', ') : '',
      projects: dev.projects || [],
      education: dev.education || []
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingDev(null);
    setFormData({ ...defaultDev, skills: '', projects: [], education: [] });
    setIsModalOpen(true);
  };

  const handleResumeClick = (devId) => {
    setUploadingFor(devId);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result.split(',')[1];
      try {
        const res = await fetch('http://localhost:5001/api/developers/upload-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            developerId: uploadingFor,
            fileName: file.name,
            base64Data
          })
        });
        if (res.ok) {
          toast.success('Resume uploaded successfully');
          fetchDevelopers();
        } else {
          toast.error('Upload failed');
        }
      } catch (err) {
        toast.error('Error uploading resume');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteResume = async (devId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      const res = await fetch('http://localhost:5001/api/developers/delete-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ developerId: devId })
      });
      if (res.ok) {
        toast.success('Resume removed');
        fetchDevelopers();
      } else {
        toast.error('Failed to remove resume');
      }
    } catch (err) {
      toast.error('Error removing resume');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      skills: typeof formData.skills === 'string' ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : formData.skills,
      price: Number(formData.price),
      years: Number(formData.years),
      experience: Number(formData.experience),
    };

    try {
      const url = editingDev 
        ? `http://localhost:5001/api/developers/${editingDev.id}` 
        : 'http://localhost:5001/api/developers';
      const method = editingDev ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(editingDev ? 'Developer updated' : 'Developer added');
        setIsModalOpen(false);
        fetchDevelopers();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error saving developer');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Dynamic Item Handlers
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', desc: '' }]
    }));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '' }]
    }));
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...formData.education];
    newEdu[index][field] = value;
    setFormData(prev => ({ ...prev, education: newEdu }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-secondary">Admin Panel: Hire Developers</h1>
          <p className="text-slate-500">Manage dedicated developers listed on the website.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={18} /> Add Developer
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".pdf" 
        onChange={handleFileChange} 
      />

      {isLoading ? (
        <div className="text-center py-20 text-slate-500 font-bold animate-pulse">Loading developers...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-bold">Talent ID</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Title</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {developers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No developers found. Add one!</td>
                </tr>
              )}
              {developers.map(dev => (
                <tr key={dev.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">{dev.talentId}</td>
                  <td className="p-4 font-medium text-secondary">
                    {dev.resumeUrl ? (
                      <div className="flex items-center gap-1.5">
                        <a href={dev.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline flex items-center gap-1">
                          {dev.name}
                          <FileText size={12} className="text-slate-400" />
                        </a>
                        <button 
                          onClick={() => handleDeleteResume(dev.id)}
                          className="p-0.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Resume"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ) : dev.name}
                  </td>
                  <td className="p-4 text-sm text-slate-500">{dev.title}</td>
                  <td className="p-4 font-bold text-primary">${dev.price}/hr</td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    <button 
                      onClick={() => handleResumeClick(dev.id)} 
                      className="text-amber-500 hover:text-amber-700 p-1.5 rounded bg-amber-50"
                      title="Upload Resume"
                    >
                      <FileText size={16} />
                    </button>
                    <button onClick={() => handleEdit(dev)} className="text-blue-500 hover:text-blue-700 p-1.5 rounded bg-blue-50">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(dev.id)} className="text-rose-500 hover:text-rose-700 p-1.5 rounded bg-rose-50">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-black text-secondary">{editingDev ? 'Edit Developer' : 'Add Developer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto styled-scrollbar">
              <form id="devForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Talent ID</label>
                  <input required name="talentId" value={formData.talentId} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. VED-1001" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="Developer Name" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Title</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. Senior React Developer" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Price ($/hr)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Years of Experience</label>
                  <input required type="number" name="years" value={formData.years} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Skill Heading</label>
                  <input required name="skillHeading" value={formData.skillHeading} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. React | Node.js" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Bio</label>
                  <textarea required name="bio" value={formData.bio} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm h-24" placeholder="Developer bio..." />
                </div>

                {/* Dynamic Projects Section */}
                <div className="md:col-span-2 space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-black text-secondary uppercase tracking-wider">Projects</label>
                    <button type="button" onClick={addProject} className="text-xs bg-secondary text-white px-3 py-1 rounded-full font-bold flex items-center gap-1 hover:bg-black">
                      <Plus size={14} /> Add Project
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.projects.map((project, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
                        <button type="button" onClick={() => removeProject(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <div className="grid gap-3">
                          <input 
                            placeholder="Project Title" 
                            value={project.title} 
                            onChange={(e) => updateProject(idx, 'title', e.target.value)}
                            className="w-full border-none bg-transparent font-bold text-secondary focus:ring-0 p-0 placeholder:text-slate-400"
                          />
                          <textarea 
                            placeholder="Project Description..." 
                            value={project.desc} 
                            onChange={(e) => updateProject(idx, 'desc', e.target.value)}
                            className="w-full border-none bg-transparent text-sm text-slate-600 focus:ring-0 p-0 h-16 resize-none placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    ))}
                    {formData.projects.length === 0 && <p className="text-xs text-slate-400 italic">No projects added yet.</p>}
                  </div>
                </div>

                {/* Dynamic Education Section */}
                <div className="md:col-span-2 space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-black text-secondary uppercase tracking-wider">Education</label>
                    <button type="button" onClick={addEducation} className="text-xs bg-secondary text-white px-3 py-1 rounded-full font-bold flex items-center gap-1 hover:bg-black">
                      <Plus size={14} /> Add Education
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.education.map((edu, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
                        <button type="button" onClick={() => removeEducation(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            placeholder="Degree (e.g. B.Tech)" 
                            value={edu.degree} 
                            onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
                            className="w-full border-none bg-transparent font-bold text-secondary focus:ring-0 p-0 placeholder:text-slate-400"
                          />
                          <input 
                            placeholder="Year (e.g. 2020)" 
                            value={edu.year} 
                            onChange={(e) => updateEducation(idx, 'year', e.target.value)}
                            className="w-full border-none bg-transparent text-sm text-right focus:ring-0 p-0 placeholder:text-slate-400"
                          />
                          <input 
                            placeholder="School/University" 
                            value={edu.school} 
                            onChange={(e) => updateEducation(idx, 'school', e.target.value)}
                            className="col-span-2 w-full border-none bg-transparent text-sm text-slate-600 focus:ring-0 p-0 placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    ))}
                    {formData.education.length === 0 && <p className="text-xs text-slate-400 italic">No education history added yet.</p>}
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2 mt-4">
                  <label className="text-xs font-bold text-slate-600">Skills (Comma separated)</label>
                  <input required name="skills" value={formData.skills} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="e.g. React, Node.js, AWS" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Total Experience Number</label>
                  <input required type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                    <input type="checkbox" name="partTime" checked={formData.partTime} onChange={handleChange} className="w-4 h-4" /> Part Time
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                    <input type="checkbox" name="fullTime" checked={formData.fullTime} onChange={handleChange} className="w-4 h-4" /> Full Time
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                    <input type="checkbox" name="verified" checked={formData.verified} onChange={handleChange} className="w-4 h-4" /> Verified
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer">
                    <input type="checkbox" name="showFullName" checked={formData.showFullName} onChange={handleChange} className="w-4 h-4" /> Show Full Name
                  </label>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <button type="submit" form="devForm" className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-dark">
                <Save size={18} /> Save Developer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
