import style from './style.module.css'
import Button from '../Button'

import { TbCircleCheckFilled } from 'react-icons/tb'

interface PlanProps {
  type: string
  price: number
  description: string
  limits: string[]
  features?: string[]
  inheritsFeaturesFrom?: string
  bestValue?: boolean
  buttonText?: string
}

/**
 * Renders a plan component, which displays a plan's details in a card-like
 * fashion. This component is typically used in the Plans section of a page.
 *
 * @param {PlanProps} props The properties for the plan component.
 * @returns {JSX.Element} The rendered plan component.
 */
export default async function Plan({
  type,
  price,
  description,
  limits,
  features,
  inheritsFeaturesFrom,
  bestValue,
  buttonText = 'Get Started',
}: PlanProps) {
  return (
    <div
      className={`${style.plan} bg-plan outline outline-1 ${
        bestValue ? 'outline-purple-500' : ' outline-black-100'
      } snap-center`}
    >
      <div className='grid gap-4 w-full'>
        <div className='grid gap-6 h-[168px] items-start'>
          <div className='flex flex-row justify-between items-start h-8'>
            <span className='capitalize text-textSecondary'>{type}</span>
            {bestValue && <span className={`${style.bestValue} bg-purple-500`}>Best Value</span>}
          </div>

          <span className='flex gap-2 items-end justify-start '>
            <span className='font-bold text-[2.5rem] leading-10'>£{price}</span>
            <span className='text-textSecondary'>per month</span>
          </span>

          <span className='text-textSecondary'>{description}</span>
        </div>

        <hr className='border-glassSurfaceHighlightBorder' />

        <div className='grid gap-2'>
          {limits.map((limit, index) => (
            <div key={index}>
              <span className='text-textSecondary flex items-center justify-start gap-2'>
                <TbCircleCheckFilled size={24} />
                <span>{limit}</span>
              </span>
            </div>
          ))}
        </div>

        {features && (
          <>
            <hr className='border-glassSurfaceHighlightBorder' />

            <ul className='grid gap-2'>
              {inheritsFeaturesFrom && (
                <span className='text-textSecondary flex items-center justify-start gap-2'>
                  <TbCircleCheckFilled size={24} />
                  <span>
                    All features from <b className='capitalize'>{inheritsFeaturesFrom}</b>
                  </span>
                </span>
              )}
              {features.map((feature, index) => (
                <li
                  key={index}
                  className='grid gap-2'
                >
                  <span className='text-textSecondary grid grid-flow-col items-center justify-start gap-2'>
                    <TbCircleCheckFilled size={24} />
                    <span>{feature}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Button
        type='secondary'
        className='w-full'
      >
        {buttonText}
      </Button>
    </div>
  )
}
