import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, Phone, Mail, Calendar, MapPin, Trash2, Eye, X, Plus, Clock } from 'lucide-react';
import api from '../../services/api';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Selected Lead Modal
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get('/leads', {
        params: {
          status: statusFilter,
          service: serviceFilter,
          search
        }
      });
      if (res.data) {
        setLeads(res.data.data || []);
        setStats(res.data.stats || {});
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, serviceFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await api.put(`/leads/${leadId}/status`, { status: newStatus });
      if (res.data?.data) {
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(res.data.data);
        }
        fetchLeads();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      const res = await api.post(`/leads/${selectedLead._id}/notes`, { text: newNote.trim() });
      if (res.data?.data) {
        setSelectedLead(res.data.data);
        setNewNote('');
        fetchLeads();
      }
    } catch (err) {
      alert('Failed to add note.');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      setSelectedLead(null);
      fetchLeads();
    } catch (err) {
      alert('Failed to delete lead.');
    }
  };

  const statuses = ['All', 'New', 'Contacted', 'Follow-up', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Leads & Enquiries</h1>
          <p className="text-xs text-slate-400 mt-1">Manage incoming photography quotes and client communications.</p>
        </div>

        {/* Stats Pill */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-300">
            Total: <strong className="text-white">{stats.totalLeads || 0}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 font-semibold">
            New: <strong>{stats.newLeads || 0}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 font-semibold">
            Confirmed: <strong>{stats.confirmedLeads || 0}</strong>
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search name, mobile, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </form>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-50 border border-slate-200 text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Database Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading Leads Database...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No leads found matching your criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-100 text-slate-500 uppercase font-semibold text-[11px] border-b border-white/10">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Event Details</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="font-mono text-slate-400 text-[11px] mt-0.5">{lead.mobile}</div>
                      {lead.city && <div className="text-[11px] text-amber-600">{lead.city}</div>}
                    </td>

                    <td className="p-4 font-semibold text-slate-200">
                      {lead.service}
                      {lead.budget && <div className="text-[11px] text-slate-400 font-normal">Budget: {lead.budget}</div>}
                    </td>

                    <td className="p-4">
                      <div className="text-slate-300">{lead.eventDate || 'Date Not Set'}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{lead.eventLocation || 'Location TBD'}</div>
                    </td>

                    <td className="p-4 text-slate-400 text-[11px]">
                      {lead.source || 'Website Form'}
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        lead.status === 'New' ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' :
                        lead.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30' :
                        lead.status === 'Contacted' ? 'bg-purple-500/20 text-purple-600 border border-purple-500/30' :
                        'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 inline-block"
                        title="WhatsApp Lead"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${lead.mobile}`}
                        className="p-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 inline-block"
                        title="Call Lead"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white inline-block"
                        title="View Full Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-600 font-semibold">Lead Details</span>
                <h2 className="text-2xl font-bold text-white font-['Outfit']">{selectedLead.name}</h2>
                <span className="text-xs text-slate-400">Received on {new Date(selectedLead.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Status Changer Dropdown */}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-semibold text-slate-400">Change Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead._id, e.target.value)}
                  disabled={updatingStatus}
                  className="bg-slate-50 border border-amber-500/40 text-amber-700 font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none"
                >
                  {statuses.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content Grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              
              {/* Customer Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-sm font-['Outfit'] text-amber-600">Customer Info</h3>
                <div><span className="text-slate-400">Mobile:</span> <strong className="text-white font-mono">{selectedLead.mobile}</strong></div>
                <div><span className="text-slate-400">WhatsApp:</span> <strong className="text-white font-mono">{selectedLead.whatsapp}</strong></div>
                <div><span className="text-slate-400">Email:</span> <span className="text-slate-200">{selectedLead.email || 'N/A'}</span></div>
                <div><span className="text-slate-400">City:</span> <span className="text-slate-200">{selectedLead.city || 'N/A'}</span></div>
              </div>

              {/* Event Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-sm font-['Outfit'] text-amber-600">Event Info</h3>
                <div><span className="text-slate-400">Service:</span> <strong className="text-white">{selectedLead.service}</strong></div>
                <div><span className="text-slate-400">Event Date:</span> <span className="text-slate-200">{selectedLead.eventDate || 'Not specified'}</span></div>
                <div><span className="text-slate-400">Location:</span> <span className="text-slate-200">{selectedLead.eventLocation || 'TBD'}</span></div>
                <div><span className="text-slate-400">Guests / Budget:</span> <span className="text-slate-200">{selectedLead.guestCount ? `${selectedLead.guestCount} guests` : ''} • {selectedLead.budget || 'Not specified'}</span></div>
              </div>

            </div>

            {/* Customer Message */}
            {selectedLead.message && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-white/10 text-xs">
                <span className="text-slate-400 font-semibold block mb-1">Customer Requirements Message:</span>
                <p className="text-slate-200 italic">"{selectedLead.message}"</p>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${selectedLead.whatsapp?.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedLead.mobile}`}
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {selectedLead.mobile}</span>
                </a>
              </div>

              <button
                onClick={() => handleDeleteLead(selectedLead._id)}
                className="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-600 hover:bg-rose-500/30 font-semibold text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
            </div>

            {/* Notes Section */}
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-white text-sm font-['Outfit']">Admin Internal Notes Timeline</h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedLead.notes?.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No notes added yet.</p>
                ) : (
                  selectedLead.notes?.map((n, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-300">
                      <div>{n.text}</div>
                      <div className="text-[10px] text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add note (e.g. Called customer, quoted ₹1.2L)..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Add Note
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
