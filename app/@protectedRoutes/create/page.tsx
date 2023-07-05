'use client';

import {
  CreateNewPoll,
  CreateNewPollSchema,
} from '@/types/newPoll/CreatePollSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ProgressBar from '@/components/shared/ProgressBar';
import Button from '@/components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import useStepIndexStore from '@/utils/store';
import CreateQuestion from '@/components/createPoll/CreateQuestion';
import AnswerOptions from '@/components/createPoll/AnswerOptions';
import RevealConditions from '@/components/createPoll/RevealConditions';
import Deadline from '@/components/createPoll/Deadline';
import AddParticipants from '@/components/createPoll/AddParticipants';
import Review from '@/components/createPoll/Review';

export default function CreatePoll() {
  const { setStepIndex, stepIndex, decreaseStepIndex, increaseStepIndex } =
    useStepIndexStore();
  const multistepComponets = [
    <CreateQuestion />,
    <AnswerOptions />,
    <RevealConditions />,
    <Deadline />,
    <AddParticipants />,
    <Review />,
  ];

  const methods = useForm<CreateNewPoll>({
    resolver: zodResolver(CreateNewPollSchema),
    mode: 'all',
    defaultValues: {
      type: 'MultipleChoice',
      options: [
        {
          option: '',
        },
        {
          option: '',
        },
      ],
      anonymity: 'AnonymousUntilQuorum',
      quorum: '80',
    },
  });

  async function nextHandler() {
    if (stepIndex < multistepComponets.length - 1) {
      let keyArray: (keyof CreateNewPoll)[] = [];
      switch (stepIndex) {
        case 0:
          keyArray = ['question', 'description'];
          break;
        case 1:
          keyArray = ['options', 'type'];
          break;
        case 2:
          keyArray = ['anonymity', 'quorum'];
          break;
        case 3:
          break;
        case 4:
          keyArray = ['participants'];
      }
      const isValid = await methods.trigger(keyArray);
      if (!isValid) return;
      increaseStepIndex();
    }
  }

  function prevHandler() {
    if (stepIndex > 0) {
      decreaseStepIndex();
    }
  }

  const titles = [
    'Create a Poll',
    'Answer Options',
    'Reveal Conditions',
    'Deadline',
    'Add participants',
    'Review & Submit',
  ];

  return (
    <main className="container flex flex-col items-center h-screen justify-between bg-teal pt-8">
      <div className="mb-[156px] w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between  pr-8 ">
        <h3 className="title-black">{titles[stepIndex]}</h3>
        <ProgressBar
          currentPage={stepIndex + 1}
          numberOfPages={multistepComponets.length}
        />
        <FormProvider {...methods}>
          <form>
            {multistepComponets[stepIndex]}

            <footer className="flex container gap-10 px-8 justify-between items-center bottom-[6.25rem] fixed">
              {stepIndex > 0 && (
                <Button
                  size="small"
                  type="button"
                  variant="secondary"
                  onClick={prevHandler}
                >
                  <GrFormPrevious size={24} strokeWidth={2} />
                  Back
                </Button>
              )}

              {stepIndex < multistepComponets.length - 1 && (
                <Button
                  size="large"
                  type="button"
                  className="ml-auto"
                  onClick={nextHandler}
                  disabled={Object.keys(methods.formState.errors).length !== 0}
                >
                  Next
                  <GrFormNext size={24} strokeWidth={2} />
                </Button>
              )}

              {stepIndex === multistepComponets.length - 1 && (
                <Button size="large" type="submit" className="ml-auto">
                  Create
                </Button>
              )}
            </footer>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
