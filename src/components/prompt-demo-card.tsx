import React from 'react'

interface PromptDemoCardProps {
    demoPrompt: string;
}

const PromptDemoCard: React.FC<PromptDemoCardProps> = ({ demoPrompt }) => {
    return (
        <div className='bg-[#1F1F1F] min-h-16 min-w-64 max-w-64 md:min-w-72 rounded-md flex items-center px-6 py-4 mr-2'>
            <span className='text-sm tracking-wide'>{demoPrompt}</span>
        </div>
    )
}

export default PromptDemoCard