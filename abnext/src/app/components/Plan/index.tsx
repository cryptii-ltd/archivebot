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
    <div className={`${style.plan} ${bestValue && 'outline outline-1 outline-accent'} snap-center`}>
      <div className='grid gap-4 w-full'>
        <div className='grid gap-6 h-[168px] items-start'>
          <div className='flex flex-row justify-between items-start h-8'>
            <span className='capitalize text-sectionDarkTextSecondary'>{type}</span>
            {bestValue && <span className={`${style.bestValue} bg-accent`}>Best Value</span>}
          </div>

          <span className='flex gap-2 items-end justify-start '>
            <span className='font-bold text-[2.5rem] leading-10'>£{price}</span>
            <span className='text-sectionDarkTextSecondary'>per month</span>
          </span>

          <span className='text-sectionDarkTextSecondary'>{description}</span>
        </div>

        <hr className='border-glassSurfaceHighlightBorder' />

        <div className='grid gap-2'>
          {limits.map((limit, index) => (
            <div key={index}>
              <span className='text-sectionDarkTextSecondary flex items-center justify-start gap-2'>
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
                <span className='text-sectionDarkTextSecondary flex items-center justify-start gap-2'>
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
                  <span className='text-sectionDarkTextSecondary grid grid-flow-col items-center justify-start gap-2'>
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
