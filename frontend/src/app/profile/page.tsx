"use client";

import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <div className="p-gutter flex-grow max-w-[1000px] mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-section-gap"
      >
        <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Executive Profile</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your clearance levels and secure access to expropriation dossiers.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-1 glass-panel p-6 rounded-xl flex flex-col items-center text-center"
        >
          <div className="w-32 h-32 rounded-full border-[3px] border-secondary/50 p-1 mb-4 relative">
            <img 
              className="w-full h-full object-cover rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9YHasl366hXQ0v61c7w_DPrtwJirrkAALrg7Y9df8ykDtK7Gwlxg8Jm0XM2Izdh6hgIGRyeXGskR9QMJlgOrOeujVGxTZjxQO7lpX0OP_HGuKUgj1FbYUcpPCawhf_seOHgyUB1cEjir9npzaI1wGZzlLokraCB5f9A4BQADuM3JTSwCiIiAnlpli3JQvPFXxelempjPjpbX09nHCGa9tSUM1PYdkhN0zilNvfu_lowR9YzGU4ptx26sbNumCYRHpQsLNxqmZfto" 
              alt="Executive Profile" 
            />
            <div className="absolute bottom-0 right-2 w-6 h-6 bg-primary rounded-full border-4 border-surface-container-lowest led-active"></div>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Expropriation Authority</h3>
          <span className="bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full mt-2 font-semibold tracking-widest uppercase">Level 5 Clearance</span>
          
          <div className="w-full h-[1px] bg-outline-variant/30 my-6"></div>

          <div className="w-full space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">Department</span>
              <span className="text-on-surface font-medium">Executive Suite</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">Location</span>
              <span className="text-on-surface font-medium">Sector 0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">Status</span>
              <span className="text-primary font-medium">Active - On Duty</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-2 flex flex-col gap-6"
        >
          <div className="glass-panel p-6 rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Recent Authorization Logs</h3>
            <div className="space-y-4">
              {[
                { action: "Approved Expropriation Order", target: "Dossier #1042", time: "10 mins ago", status: "success" },
                { action: "Requested Compliance Audit", target: "Sector 7 Asset", time: "2 hours ago", status: "pending" },
                { action: "Reviewed Topography Scan", target: "Region Delta", time: "Yesterday", status: "success" },
                { action: "System Login", target: "Node 01", time: "2 days ago", status: "neutral" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4 p-3 hover:bg-surface-bright/30 rounded-lg transition-colors">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    log.status === 'success' ? 'bg-primary' : 
                    log.status === 'pending' ? 'bg-secondary' : 'bg-outline-variant'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-on-surface font-medium text-sm">{log.action}</p>
                    <p className="text-on-surface-variant text-xs mt-1">{log.target}</p>
                  </div>
                  <span className="text-tertiary text-xs">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3">
                <div>
                  <h4 className="text-on-surface font-medium text-sm">Two-Factor Authentication</h4>
                  <p className="text-on-surface-variant text-xs mt-1">Require biometric or hardware token for execution orders.</p>
                </div>
                <button className="bg-primary/20 text-primary border border-primary/50 px-4 py-1.5 rounded text-xs font-semibold">Enabled</button>
              </div>
              <div className="flex items-center justify-between p-3">
                <div>
                  <h4 className="text-on-surface font-medium text-sm">Session Timeout</h4>
                  <p className="text-on-surface-variant text-xs mt-1">Automatically lock terminal after inactivity.</p>
                </div>
                <button className="bg-surface-container text-on-surface-variant border border-outline-variant/50 px-4 py-1.5 rounded text-xs hover:text-on-surface transition-colors">60 Minutes</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
