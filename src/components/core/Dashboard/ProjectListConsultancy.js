import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const statuses = {
  active: 'text-green-600 bg-green-200 ring-green-600/20',
  closed: 'text-gray-600 bg-gray-200 ring-gray-500/10',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function ProjectListConsultancy({allConsultancyProjects}) {
  return (
    <ul role="list" className="divide-y divide-gray-300">
      {allConsultancyProjects.map((project,index) => (
        <li key={index} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900">{project.c_project_title}</p>
              <p
                className={classNames(
                  statuses[project.status],
                  'mt-0.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset',
                )}
              >
                {project?.status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              {project?.status==="active" && <p className="whitespace-nowrap">
                Started on : <time>{project?.start_date}</time>
              </p>}
              {project?.status==="closed" && <p className="whitespace-nowrap">
                Completed on : <time>{project?.end_date}</time>
              </p>}
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">Role : {project?.role}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
          <Link to={`/dashboard/cprojects/${project.c_project_id}`}>
          <div
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View project
            </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}