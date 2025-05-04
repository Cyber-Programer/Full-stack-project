import React from 'react'

const NoTaskFound = () => {
  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center mt-15'>
        <img src="/assets/task.svg" alt="task" />
        <h3 className='font-semibold text-2xl'>No Task is Available yet, Please Add your New Task</h3>
    </div>
  )
}

export default NoTaskFound