import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const statuses = {
  awarded: 'text-green-600 bg-green-200 ring-green-600/20',
  closed: 'text-gray-600 bg-gray-200 ring-gray-500/10',
  proposed: 'text-yellow-800 bg-yellow-200 ring-yellow-600/20',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function ProjectListResearch({allResearchProjects}) {
  return (
    <ul role="list" className="divide-y divide-gray-300">
      {allResearchProjects.map((project,index) => (
        <li key={index} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900">{project.r_project_title}</p>
              <p
                className={classNames(
                  statuses[project.r_status],
                  'mt-0.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {project?.r_status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              {project?.r_status==="proposed" && <p className="whitespace-nowrap">
                Proposed on : <time>{project.Proposal_date}</time>
              </p>}
              {project?.r_status==="awarded" && <p className="whitespace-nowrap">
                Started on : <time>{project.Start_date}</time>
              </p>}
              {project?.r_status==="closed" && <p className="whitespace-nowrap">
                Completed on : <time>{project.completion_date}</time>
              </p>}
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">Role : {project?.role}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
          <Link to={`/dashboard/research-proj/${project.r_project_id}`}>
          <div
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View project<span className="sr-only">, {project?.name}</span>
            </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}