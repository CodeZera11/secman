'use client'

import { useFormContext } from 'react-hook-form'
import { DateTimePicker } from '../components/ui/datetime-picker'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { cn } from '../lib/utils'

interface DateTimePickerElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  description?: string
}

const DateTimePickerElement: React.FC<DateTimePickerElementProps> = ({ name, label, placeholder, description, ...props }) => {
  const { control, setValue } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col gap-1'>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <DateTimePicker
              value={new Date(field.value)}
              onChange={(val) => {
                setValue(name, val?.toISOString())
              }}
              hourCycle={12}
              className={cn('', props.className)}
              contentClassName='bg-black text-white border-zinc-700'
            />
          </FormControl>
          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DateTimePickerElement