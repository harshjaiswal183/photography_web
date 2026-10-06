import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Image, Layers, CheckCircle2, Clock, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    followUpLeads: 0,
    confirmedLeads: 0,
    portfolioCount: 0,
    servicesCount: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, portfolioRes, servicesRes] = await Promise.all([
          api.get('/leads'),
          api.get('/portfolio/admin/all'),
          api.get('/services/admin/all')
        ]);

        if (leadsRes.data) {
          setStats(prev => ({
            ...prev,
            totalLeads: leadsRes.data.stats?.totalLeads || 0,
            newLeads: leadsRes.data.stats?.newLeads || 0,
            followUpLeads: leadsRes.data.stats?.followUpLeads || 0,
            confirmedLeads: leadsRes.data.stats?.confirmedLeads || 0
          }));
          setRecentLeads((leadsRes.data.data || []).slice(0, 5));
        }

        if (portfolioRes.data?.data) {
          setStats(prev => ({ ...prev, portfolioCount: portfolioRes.data.data.length }));
        }

        if (servicesRes.data?.data) {
          setStats(prev => ({ ...prev, servicesCount: servicesRes.data.data.length }));
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Business Overview Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time studio lead generation and management status.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Leads</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-['Outfit']">{stats.totalLeads}</div>
          <span className="text-[11px] text-amber-600">All enquiry submissions</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">New Leads</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-blue-600 font-['Outfit']">{stats.newLeads}</div>
          <span className="text-[11px] text-slate-400">Requires immediate contact</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Confirmed Bookings</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-['Outfit']">{stats.confirmedLeads}</div>
          <span className="text-[11px] text-slate-400">Converted clients</span>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Portfolio Shots</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-purple-600 font-['Outfit']">{stats.portfolioCount}</div>
          <span className="text-[11px] text-slate-400">Live published images</span>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">Recent Enquiries</h2>
            <p className="text-xs text-slate-400">Latest potential clients from website form & WhatsApp</p>
          </div>
          <Link
            to="/admin/leads"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-700 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span>Manage All Leads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-500 text-xs">Loading dashboard recent leads...</div>
        ) : recentLeads.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">No leads submitted yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-100 text-slate-500 uppercase font-semibold text-[11px] border-b border-white/10">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Service</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5">Event Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white">{lead.name}</td>
                    <td className="p-3.5 text-amber-700">{lead.service}</td>
                    <td className="p-3.5 font-mono text-slate-400">{lead.mobile}</td>
                    <td className="p-3.5 text-slate-400">{lead.eventDate || 'N/A'}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        lead.status === 'New' ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30' :
                        lead.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30' :
                        'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <a
                        href={`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 inline-block"
                        title="WhatsApp Customer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${lead.mobile}`}
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 inline-block"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
