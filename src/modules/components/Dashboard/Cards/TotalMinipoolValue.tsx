import { Box, useDisclosure, useToken } from '@chakra-ui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ClimbingBoxLoader } from 'react-spinners'

import { EmptyState } from '../../MinipoolTable/EmptyState'
import { UnstakeModal } from '../../Modal/UnstakeModal'

import { Button } from '@/common/components/Button'
import { Card, Title } from '@/common/components/Card'
import { Tooltip } from '@/common/components/Tooltip'

export interface TotalMinipoolValueProps {
  totalValue?: number
  avaxValue?: number
  ggpValue?: number
  avaxStake?: number
  ratio?: number
  ggpStake?: number
  isLoading?: boolean
}

const TotalMinipoolValue = ({
  avaxStake = 0,
  avaxValue = 0,
  ggpValue = 0,
  isLoading = false,
  ratio = 0,
  totalValue = 0,
}: TotalMinipoolValueProps) => {
  const color = useToken('colors', 'blue.400')
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Card borderRadius={10} className="my-2 flex !w-full flex-col border shadow-lg">
      <UnstakeModal isOpen={isOpen} onClose={onClose} />
      <Title className="flex w-full items-center justify-between" fontSize="2xl">
        <span className="flex items-center space-x-2">
          <span>Total Minipool Value</span>
          <Tooltip
            content="Total amount you have staked in the
          protocol"
          >
            <InformationCircleIcon className="h-6 text-gray-500" />
          </Tooltip>
        </span>
        <Tooltip content={!ggpValue ? 'You cannot unstake as you do not have any GGP staked' : ''}>
          <Button disabled={!ggpValue} onClick={onOpen} size="xs" variant="secondary-outline">
            Unstake
          </Button>
        </Tooltip>
      </Title>
      {isLoading && (
        <Box alignItems="center" display="flex" justifyContent="center">
          <ClimbingBoxLoader color={color} />
        </Box>
      )}
      {!totalValue ? (
        <EmptyState
          description="You might have to wait a bit for rewards to show up"
          icon={
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          title="No minipool value"
        />
      ) : null}
      {!isLoading && totalValue ? (
        <>
          <div className="mx-auto flex h-full flex-col py-10 font-bold text-indigo-600">
            <div className="flex flex-row items-center justify-around space-x-12 text-4xl">
              <div className="flex flex-row items-center space-x-2 ">
                <svg
                  fill="none"
                  height="19"
                  viewBox="0 0 19 19"
                  width="19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M18.9874 9.50006C18.9874 14.7398 14.7369 18.9874 9.49368 18.9874C4.25046 18.9874 0 14.7398 0 9.50006C0 4.26033 4.25046 0.0126953 9.49368 0.0126953C14.7369 0.0126953 18.9874 4.26033 18.9874 9.50006ZM6.80344 13.2756H4.96098C4.57383 13.2756 4.38259 13.2756 4.26599 13.201C4.14004 13.1194 4.06308 12.9842 4.05375 12.835C4.04675 12.6976 4.14238 12.5297 4.33362 12.1941L8.88287 4.18076C9.07645 3.84048 9.1744 3.67033 9.298 3.60741C9.43094 3.53982 9.58954 3.53982 9.72248 3.60741C9.84608 3.67033 9.94404 3.84048 10.1376 4.18076L11.0728 5.81223L11.0776 5.82056C11.2867 6.18561 11.3927 6.37073 11.439 6.56503C11.4903 6.77712 11.4903 7.00087 11.439 7.21296C11.3924 7.40874 11.2874 7.5952 11.0752 7.96577L8.68555 12.1871L8.67937 12.1979C8.46892 12.566 8.36226 12.7525 8.21445 12.8933C8.05352 13.0471 7.85994 13.159 7.64771 13.222C7.45413 13.2756 7.23724 13.2756 6.80344 13.2756ZM11.4563 13.2756H14.0963C14.4858 13.2756 14.6817 13.2756 14.7984 13.1987C14.9243 13.1171 15.0036 12.9796 15.0106 12.8305C15.0173 12.6975 14.9238 12.5361 14.7405 12.22C14.7342 12.2093 14.7278 12.1983 14.7214 12.1872L13.399 9.92642L13.3839 9.90097C13.1981 9.58694 13.1043 9.42836 12.9838 9.36706C12.851 9.29946 12.6946 9.29946 12.5617 9.36706C12.4404 9.42999 12.3425 9.59547 12.1489 9.92875L10.8312 12.1895L10.8267 12.1973C10.6338 12.53 10.5374 12.6963 10.5444 12.8328C10.5537 12.982 10.6306 13.1194 10.7566 13.201C10.8709 13.2756 11.0668 13.2756 11.4563 13.2756Z"
                    fill="#E84142"
                    fillRule="evenodd"
                  />
                </svg>
                <span>{avaxValue.toLocaleString()}</span>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <svg
                  className="h-6 w-6 rounded-full bg-[#3E33BB] p-1"
                  fill="none"
                  height="14"
                  viewBox="0 0 9 14"
                  width="9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_2967_6225)">
                    <path
                      d="M5.3222 11.5733L3.69648 11.5537C3.50283 11.5521 3.34354 11.714 3.34198 11.9167L3.33261 12.767C3.3248 13.4407 3.84016 13.9917 4.48357 13.9999C5.12698 14.0081 5.65327 13.4685 5.66108 12.7948L5.67045 11.9445C5.67201 11.7418 5.51741 11.575 5.32376 11.5733H5.3222Z"
                      fill="white"
                    />
                    <path
                      d="M4.27727 0.00466366C2.01127 0.120758 0.141928 2.05675 0.00762286 4.4277C-0.0735848 5.8568 0.460512 7.16327 1.36161 8.08222H1.36473L1.37878 8.1002L1.688 8.38308L2.99044 9.57836C3.131 9.70754 3.31059 9.77785 3.49799 9.77785H5.50008C5.68748 9.77785 5.86707 9.70754 6.00762 9.57836L7.35692 8.34057L7.39752 8.30296L7.57087 8.14272L7.58024 8.13618C8.45323 7.27446 8.99825 6.05792 8.99825 4.70894C8.99982 2.0355 6.85718 -0.126147 4.27727 0.00466366ZM4.5006 2.50642C5.65937 2.50642 6.60419 3.49567 6.60419 4.71057C6.60419 5.92548 5.65937 6.9131 4.5006 6.9131C3.34182 6.9131 2.397 5.92384 2.397 4.71057C2.397 3.49731 3.34182 2.50642 4.5006 2.50642V2.50642Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2967_6225">
                      <rect fill="white" height="14" width="9" />
                    </clipPath>
                  </defs>
                </svg>
                <span>{ggpValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-row justify-around border-t pt-4">
            <div className="flex justify-center overflow-hidden text-center text-base font-bold text-indigo-600">
              <span>Ratio: {avaxStake ? (ratio || 0).toLocaleString() : 0}%</span>
              <Tooltip content="Your collateral ratio">
                <InformationCircleIcon className="h-4 text-gray-500" />
              </Tooltip>
            </div>
          </div>
        </>
      ) : null}
    </Card>
  )
}

export default TotalMinipoolValue
