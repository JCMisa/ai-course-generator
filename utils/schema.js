import {
    json,
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    name: varchar("name"),
    category: varchar("category"),
    level: varchar("level"),
    courseOutput: json("courseOutput"),
    createdBy: varchar("createdBy"),
    username: varchar("username"),
    userProfileImage: varchar("userProfileImage"),
});