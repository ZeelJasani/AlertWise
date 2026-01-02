"use client";

import { BarChart3, Download } from "lucide-react";

export default function Analytics() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        School Preparedness Analytics
                    </h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Comprehensive disaster preparedness metrics and heatmaps</p>
                </div>
            </div>

            <div className="bg-white border-slate-200 rounded-[3rem] h-[500px] flex flex-col items-center justify-center text-center p-12 shadow-sm border-dashed border-2">
                <div className="p-8 rounded-full bg-slate-50 mb-8 border border-slate-100">
                    <BarChart3 className="h-16 w-16 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Analytics Dashboard</h3>
                <p className="max-w-md text-slate-500 font-medium mb-10 leading-relaxed">
                    Interactive charts, heatmaps, and district-level preparedness metrics will be displayed here.
                </p>
                <button className="px-10 py-4 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-all shadow-sm">
                    <Download className="h-5 w-5" />
                    Generate Report
                </button>
            </div>
        </div>
    );
}
