import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const DashboardPage = () => {
    return (
        <div>
            <AddCourse />

            {/* display list of course */}
            <UserCourseList />
        </div>
    )
}

export default DashboardPage