import { VoteAnswer } from '@/app/(protected)/voting/[...slug]/page';
import { Poll } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { useForm } from 'react-hook-form';

//axios get request to get the data from the database
function getPollData(userID: string, pollID: string) {
  const votePoll = axios.get<Poll>('/api/voting/', {
    params: { userId: userID, pollId: pollID },
  });
  return votePoll;
}

//useQuery to call the axios get request
export function useVotePollQuery(userId: string, pollId: string) {
  const query = useQuery({
    queryKey: ['votePoll', userId],
    queryFn: () => getPollData(userId, pollId),
  });
  return { query };
}

///useMutation to call the axios post request
function sendVote(requestvote: VoteAnswer) {
  const sendVoteRequest = axios.post('/api/voting/', requestvote);
  console.log(sendVoteRequest);
  return sendVoteRequest;
}

export function useVotePollMutation(userId: string) {
  const mutation = useMutation({
    mutationKey: ['votePoll', userId],
    mutationFn: (requestvote: VoteAnswer) => sendVote(requestvote),
  });
  return { ...mutation };
}

// type VoteResponse = {
//   message: string;
// };

// type myVote = {
//   id: number;
//   answer: boolean[];
//   pollId: number;
//   userId: number;
// };
