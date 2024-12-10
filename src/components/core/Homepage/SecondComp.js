'use client'
import one from '../../../assets/home/one.png'
import two from '../../../assets/home/two.png'
import three from '../../../assets/home/three.png'
import four from '../../../assets/home/four.png'
import five from '../../../assets/home/five.png'
import con from '../../../assets/home/con.webp'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
const pricing = {
  frequencies: [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
  ],
  tiers: [
    {
      name: 'Hobby',
      id: 'tier-hobby',
      href: '#',
      price: { monthly: '$19', annually: '$199' },
      description: 'The essentials to provide your best work for clients.',
      features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics'],
      mostPopular: false,
    },
    {
      name: 'Freelancer',
      id: 'tier-freelancer',
      href: '#',
      price: { monthly: '$29', annually: '$299' },
      description: 'The essentials to provide your best work for clients.',
      features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
      mostPopular: false,
    },
    {
      name: 'Startup',
      id: 'tier-startup',
      href: '#',
      price: { monthly: '$59', annually: '$599' },
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      price: { monthly: '$99', annually: '$999' },
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        '1-hour, dedicated support response time',
        'Marketing automations',
        'Custom reporting tools',
      ],
      mostPopular: false,
    },
  ],
}
const faqs = [
  {
    question: "Can I register with any email id?",
    answer:
      "No, to register on this portal you must have iiitg email ID.",
  },
  {
    question: "How to make a proposal for a Project?",
    answer:
      "First find a appropriate project and then get it verified from the R&D section .",
  },
  {
    question: "Is there any tax in the Consultancy Project?",
    answer:
      "yes, there is tax i.e 18% to paid.",
  },
  {
    question: "Where I can see my fund details?",
    answer:
      "Login with your credentials and then move to respective project",
  },
  {
    question: "How can I send Utilization Certificates?",
    answer:
      "Contact R&D section , they will verify your certificate and send to the respective authority.",
  },
  {
    question: "How can I raise invoice?",
    answer:
      "Contact R&D section, they will raise Invoice.",
  },
  {
    question: "What to do if a Project gets completed?",
    answer:
      "Prepare a final report and submit to the R&D section,later on they will mark your project as closed.",
  },
  // More questions...
]
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SecondComp() {

  const { token } = useSelector((state)=>state.auth);

  return (
    <div className="bg-white">

      <main>
        {/* Pricing section */}
        <div className="mx-auto max-w-7xl px-6 mt-[-80px] lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* <h1 className="text-base/7 font-semibold text-indigo-600">Pricing</h1> */}
            <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              A Platform For Your Projects
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
            A Management Portal where you can manage your all your Research and Consultancy projects under IIITG
          </p>
        </div>

        {/* Logo cloud */}
        <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Transistor"
              src={two}
            //   width={250}
            //   height={80}
              className="col-span-2 h-[100px] object-contain lg:col-span-1"
            />
            <img
              alt="Reform"
              src={four}
            //   width={158}
            //   height={48}
              className="col-span-2  h-[80px] object-contain lg:col-span-1"
            />
            <img
              alt="Tuple"
              src={five}
            //   width={158}
            //   height={48}
              className="col-span-2 h-[90px] object-contain lg:col-span-1"
            />
            <img
              alt="SavvyCal"
              src={con}
            //   width={158}
            //   height={48}
              className="col-span-2 h-[115px] object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="Statamic"
              src={three}
            //   width={158}
            //   height={48}
              className="col-span-2 col-start-2 h-[90px] object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
            {!token && <div className="mt-16 flex justify-center">
            <p className="relative rounded-full bg-gray-50 px-4 py-1.5 text-sm/6 text-gray-600 ring-1 ring-inset ring-gray-900/5">
              <span className="hidden md:inline font-semibold text-lg">
                Start today with us
              </span>
              <Link to={'/signup'} className="text-indigo-600 font-bold text-2xl">
                <span className="absolute inset-0" /> Get Started{' '}
                {/* <span aria-hidden="true">&rarr;</span> */}
              </Link>
            </p>
          </div>}
        </div>

        {/* Testimonial section */}
        <div className="mx-auto mt-24 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              className="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
            />
            <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div aria-hidden="true" className="absolute -left-80 -top-56 transform-gpu blur-3xl">
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
              />
            </div>
            <div
              aria-hidden="true"
              className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
              />
            </div>
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/workcation-logo-white.svg"
                className="h-12 w-auto"
              />
              <figure>
                <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl/8">
                  <p>
                    “The Research and Consultancy Project Management Portal has transformed the way we manage our projects.
                    As a faculty member, I can now access all my project details, funding breakdowns, and compliance requirements at the click of a button”
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base text-white">
                  <div className="font-semibold">Sumit Mishra</div>
                  <div className="mt-1">Assistant Professor</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto my-24 max-w-7xl px-6 sm:my-56 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="pt-6">
                {({ open }) => (
                    <>
                    <dt>
                        <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base/7 font-semibold">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                            <PlusSmallIcon
                            aria-hidden="true"
                            className={`h-6 w-6 ${open ? "hidden" : "block"}`}
                            />
                            <MinusSmallIcon
                            aria-hidden="true"
                            className={`h-6 w-6 ${open ? "block" : "hidden"}`}
                            />
                        </span>
                        </Disclosure.Button>
                    </dt>
                    <Transition
                        show={open}
                        enter="transition-all duration-500 ease-out"
                        enterFrom="max-h-0 opacity-0"
                        enterTo="max-h-screen opacity-100"
                        leave="transition-all duration-500 ease-in"
                        leaveFrom="max-h-screen opacity-100"
                        leaveTo="max-h-0 opacity-0"
                    >
                        <Disclosure.Panel as="dd" className="mt-2 pr-12 overflow-hidden">
                        <p className="text-base/7 text-gray-600">{faq.answer}</p>
                        </Disclosure.Panel>
                    </Transition>
                    </>
                )}
                </Disclosure>
            ))}
            </dl>
        </div>
        </div>
      </main>

    </div>
  )
}