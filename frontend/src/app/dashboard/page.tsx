import Dropdown from "@/components/Dropdown";
import KanbanBoard from "@/components/KanbanBoard";

export default function DashboardPage() {
  return (
    <>
    
      
{/* Board Toolbar */}
<div className="px-gutter py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/10">
<div>
<h3 className="font-headline-lg text-headline-lg text-on-surface">Active Operations</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and track property acquisition lifecycles.</p>
</div>
{/* Filters */}
<div className="flex flex-wrap gap-3 z-50">
  <Dropdown label="Priority" icon="filter_list" options={["High", "Medium", "Low"]} />
  <Dropdown label="Value" icon="attach_money" options={["Ascending", "Descending"]} />
  <Dropdown label="Status" icon="status" options={["Active", "Pending", "Resolved", "Archived"]} />
</div>
</div>
{/* Kanban Board Container */}
<KanbanBoard />


        </>
  )
}
