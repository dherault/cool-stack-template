import { Fragment } from 'react'

type StepperProps = {
  steps: string[]
  labels?: string[]
  stepIndex: number
}

function Stepper({ steps, labels, stepIndex }: StepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <Fragment key={index}>
          {index !== 0 && (
            <div
              className={`flex-grow h-0.5 min-w-32 ${
                index <= stepIndex
                  ? 'bg-blue'
                  : 'bg-gray-200'
              }`}
            />
          )}
          <div className="relative flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index <= stepIndex
                  ? 'bg-blue text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < stepIndex ? '✓' : labels?.[index] ?? step + 1}
            </div>
            <div className="absolute top-[calc(100%+0.5rem)] text-center">
              {step}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default Stepper
