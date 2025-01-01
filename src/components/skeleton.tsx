import { cn } from '@/lib/utils'
import React from 'react'

const Skeleton: React.FC<React.HTMLProps<HTMLDivElement>> = ({
	className,
	...props
}) => {
	return <div className={cn('animate-pulse', className)} {...props} />
}

export default Skeleton
