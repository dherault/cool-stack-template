import { Button } from '~components/ui/Button'

function Page() {
  return (
    <div className="mx-auto px-6 py-8 container">
      <h2 className="text-center text-6xl font-bold">
        Pricing
      </h2>
      <div className="mt-8 flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
        <div className="flex flex-col w-full max-w-xs p-4 space-y-8 text-center bg-white border rounded-lg lg:mx-4 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex-shrink-0">
            <h2 className="inline-flex items-center justify-center px-2 py-1 font-semibold tracking-tight text-blue uppercase rounded-lg bg-neutral-50 dark:bg-neutral-700">
              Founder
            </h2>
          </div>
          <div className="flex-shrink-0">
            <span
              className="pt-2 text-4xl font-bold text-neutral-800 dark:text-neutral-100"
            >
              Free
            </span>
          </div>
          <ul className="flex-1 space-y-4">
            <li className="text-neutral-500 dark:text-neutral-400">
              1 project
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              1 collaborator
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              Community support
            </li>
          </ul>
          <div className="flex justify-center">
            <Button>
              Get started
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xs p-4 space-y-8 text-center bg-white border rounded-lg lg:mx-4 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex-shrink-0">
            <h2 className="inline-flex items-center justify-center px-2 py-1 font-semibold tracking-tight text-blue uppercase rounded-lg bg-neutral-50 dark:bg-neutral-700">
              Startup
            </h2>
          </div>
          <div className="flex-shrink-0">
            <span
              className="pt-2 text-4xl font-bold text-neutral-800 dark:text-neutral-100"
            >
              $19
            </span>
            {' '}
            <span className="text-neutral-500 dark:text-neutral-400">
              /month
            </span>
          </div>
          <ul className="flex-1 space-y-4">
            <li className="text-neutral-500 dark:text-neutral-400">
              ∞ projects
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              Up to 5 collaborators
              {' '}
              <span className="text-xs">
                (coming soon)
              </span>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              Real-time collaboration
              {' '}
              <span className="text-xs">
                (coming soon)
              </span>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              Dedicated support
            </li>
          </ul>
          <div className="flex justify-center">
            <Button>
              Start free trial
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-xs p-4 space-y-8 text-center bg-white border rounded-lg lg:mx-4 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex-shrink-0">
            <h2 className="inline-flex items-center justify-center px-2 py-1 font-semibold tracking-tight text-blue uppercase rounded-lg bg-neutral-50 dark:bg-neutral-700">
              Enterprise
            </h2>
          </div>
          <div className="flex-shrink-0">
            <span
              className="pt-2 text-4xl font-bold text-neutral-800 dark:text-neutral-100"
            >
              Custom
            </span>
          </div>
          <ul className="flex-1 space-y-4">
            <li className="text-neutral-500 dark:text-neutral-400">
              ∞ projects
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              ∞ collaborators
              {' '}
              <span className="text-xs">
                (coming soon)
              </span>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              Real-time collaboration
              {' '}
              <span className="text-xs">
                (coming soon)
              </span>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              24x7 Dedicated support
            </li>
          </ul>
          <div className="flex justify-center">
            <Button>
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
