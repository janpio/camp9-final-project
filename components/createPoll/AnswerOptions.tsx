'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';
import RadioButton from '../Radiobutton';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';

export default function AnswerOptions() {
  const { register, formState, getValues, setValue, control } =
    useFormContext<CreateNewPoll>(); // retrieve all hook methods
  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  return (
    <div className="pl-8 flex flex-col gap-2">
      <h3 className="title-black">Answer Options</h3>
      <fieldset className="flex flex-col font-semibold gap-2 w-full">
        <div className="flex justify-between items-center ">
          <RadioButton
            label="Single Choice"
            value="SingleChoice"
            {...register('type')}
          />
        </div>
        <div className="flex flex-row justify-between body-semibold items-center mb-2">
          <RadioButton
            label="Multiple Choice"
            value="MultipleChoice"
            {...register('type')}
          />
        </div>
      </fieldset>
      <hr className="border border-black"></hr>
      <fieldset className="flex pt-2 flex-col gap-1 center w-full scrollbar overflow-y-scroll pr-2 min-h-min h-80">
        {fields.map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between gap-2 pb-1 items-end w-full"
          >
            <InputField
              {...register(`options.${index}.option`)}
              type="text"
              label={`Option ${index + 1}`}
              placeholder={`Option ${index + 1}`}
              error={formState.errors.options?.[index]?.option}
            />

            <Button
              variant="secondary"
              type="button"
              size="xs"
              // the button does not shrink
              disabled={fields.length <= 2}
              className="button shrink-0"
              onClick={() => remove(index)} // Pass the index to handleDeleteOption
            >
              -
            </Button>
          </div>
        ))}

        {
          <div className="flex my-1">
            <Button
              type="button"
              size="small"
              className="ml-auto"
              variant="secondary"
              onClick={() => append({ option: '' })}
            >
              + Option
            </Button>
          </div>
        }
      </fieldset>
    </div>
  );
}
