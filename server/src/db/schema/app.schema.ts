import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  index,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

// ============================================
// ENUMS
// ============================================

export const budgetLineCategoryEnum = pgEnum("budget_line_category", [
  "income",
  "giving",
  "saving",
  "expense",
  "debt",
  "groceries",
  "eating_out",
]);

export const householdMemberRoleEnum = pgEnum("household_member_role", [
  "client",
  "partner",
  "dependent",
]);

export const ageCohortEnum = pgEnum("age_cohort", [
  "14-18",
  "19-25",
  "26-35",
]);

// ============================================
// USER PROFILE (extends better-auth user)
// ============================================

export const userProfile = pgTable(
  "user_profile",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: "cascade" }),
    fullname: text("fullname"),
    displayName: text("display_name"),
    phoneNumber: text("phone_number"),
    photoUrl: text("photo_url"),
    familyPhotoUrl: text("family_photo_url"),
    ageCohort: ageCohortEnum("age_cohort"),
    streak: integer("streak").default(0).notNull(),
    streakEligible: boolean("streak_eligible").default(false).notNull(),
    streakStartedAt: timestamp("streak_started_at"),
    lastVisit: timestamp("last_visit"),
    lastLogin: timestamp("last_login"),
    darkMode: boolean("dark_mode").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("user_profile_userId_idx").on(t.userId)],
);

// ============================================
// HOUSEHOLD
// ============================================

export const household = pgTable(
  "household",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    familyLastName: text("family_last_name"),
    familyProfilePic: text("family_profile_pic"),
    whyStatement: text("why_statement"),
    lifecycleNotes: text("lifecycle_notes"),
    riskManagementNotes: text("risk_management_notes"),
    estateNotes: text("estate_notes"),
    investmentNotes: text("investment_notes"),
    taxNotes: text("tax_notes"),
    date: timestamp("date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("household_userId_idx").on(t.userId)],
);

export const householdMember = pgTable(
  "household_member",
  {
    id: text("id").primaryKey(),
    householdId: text("household_id")
      .notNull()
      .references(() => household.id, { onDelete: "cascade" }),
    role: householdMemberRoleEnum("role").notNull(),
    name: text("name"),
    age: integer("age"),
    occupation: text("occupation"),
    annualSalary: text("annual_salary"),
    maritalStatus: text("marital_status"),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("household_member_householdId_idx").on(t.householdId)],
);

// ============================================
// BUDGET
// ============================================

export const budget = pgTable(
  "budget",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: timestamp("date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("budget_userId_idx").on(t.userId)],
);

export const budgetLine = pgTable(
  "budget_line",
  {
    id: text("id").primaryKey(),
    budgetId: text("budget_id")
      .notNull()
      .references(() => budget.id, { onDelete: "cascade" }),
    category: budgetLineCategoryEnum("category").notNull(),
    label: text("label").notNull(),
    amount: doublePrecision("amount").default(0).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (t) => [index("budget_line_budgetId_idx").on(t.budgetId)],
);

// ============================================
// NET WORTH
// ============================================

export const netWorth = pgTable(
  "net_worth",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: timestamp("date"),
    year: text("year"),
    goal: doublePrecision("goal"),
    // assets
    personalRealEstate: doublePrecision("personal_real_estate").default(0).notNull(),
    investmentRealEstate: doublePrecision("investment_real_estate").default(0).notNull(),
    checkingAccounts: doublePrecision("checking_accounts").default(0).notNull(),
    savingsAccounts: doublePrecision("savings_accounts").default(0).notNull(),
    cdAccounts: doublePrecision("cd_accounts").default(0).notNull(),
    retirementAccounts: doublePrecision("retirement_accounts").default(0).notNull(),
    investmentAccounts: doublePrecision("investment_accounts").default(0).notNull(),
    cars: doublePrecision("cars").default(0).notNull(),
    otherAsset1: doublePrecision("other_asset_1").default(0).notNull(),
    otherAsset2: doublePrecision("other_asset_2").default(0).notNull(),
    otherAsset3: doublePrecision("other_asset_3").default(0).notNull(),
    // liabilities
    personalRealEstateLoans: doublePrecision("personal_real_estate_loans").default(0).notNull(),
    investmentRealEstateLoans: doublePrecision("investment_real_estate_loans").default(0).notNull(),
    creditCardDebt: doublePrecision("credit_card_debt").default(0).notNull(),
    personalLoans: doublePrecision("personal_loans").default(0).notNull(),
    studentLoans: doublePrecision("student_loans").default(0).notNull(),
    carLoans: doublePrecision("car_loans").default(0).notNull(),
    otherDebt1: doublePrecision("other_debt_1").default(0).notNull(),
    otherDebt2: doublePrecision("other_debt_2").default(0).notNull(),
    otherDebt3: doublePrecision("other_debt_3").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("net_worth_userId_idx").on(t.userId)],
);

// ============================================
// GOALS
// ============================================

export const goal = pgTable(
  "goal",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    amountSaved: doublePrecision("amount_saved").default(0).notNull(),
    amountNeeded: doublePrecision("amount_needed").default(0).notNull(),
    targetDate: timestamp("target_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("goal_userId_idx").on(t.userId)],
);

// ============================================
// TASKS
// ============================================

export const task = pgTable(
  "task",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    day: text("day"),
    image: text("image"),
    dueDate: timestamp("due_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("task_userId_idx").on(t.userId)],
);

// ============================================
// JOURNAL
// ============================================

export const journalEntry = pgTable(
  "journal_entry",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    body: text("body").notNull(),
    entryDate: timestamp("entry_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("journal_entry_userId_idx").on(t.userId)],
);

// ============================================
// SLEEP ON IT
// ============================================

export const sleepOnIt = pgTable(
  "sleep_on_it",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    itemName: text("item_name").notNull(),
    description: text("description"),
    itemCost: doublePrecision("item_cost").default(0).notNull(),
    wantVsNeed: text("want_vs_need"),
    pros: text("pros"),
    cons: text("cons"),
    prosAndCons: text("pros_and_cons"),
    timeInvestedYears: doublePrecision("time_invested_years"),
    projectedInterestRate: doublePrecision("projected_interest_rate"),
    awareness: text("awareness"),
    decisionDate: timestamp("decision_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("sleep_on_it_userId_idx").on(t.userId)],
);

export const sleepOnItTracker = pgTable(
  "sleep_on_it_tracker",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    year: integer("year"),
    date: timestamp("date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [index("sleep_on_it_tracker_userId_idx").on(t.userId)],
);

export const sleepOnItTrackerItem = pgTable(
  "sleep_on_it_tracker_item",
  {
    id: text("id").primaryKey(),
    trackerId: text("tracker_id")
      .notNull()
      .references(() => sleepOnItTracker.id, { onDelete: "cascade" }),
    itemName: text("item_name").notNull(),
    itemCost: doublePrecision("item_cost").default(0).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (t) => [index("sleep_on_it_tracker_item_trackerId_idx").on(t.trackerId)],
);

// ============================================
// FOCUS
// ============================================

export const focus = pgTable(
  "focus",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    focus: text("focus").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("focus_userId_idx").on(t.userId)],
);

// ============================================
// FAVORITE TIPS
// ============================================

export const favoriteTip = pgTable(
  "favorite_tip",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    tip: text("tip").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("favorite_tip_userId_idx").on(t.userId)],
);

// ============================================
// GLOSSARY (global, no user FK)
// ============================================

export const glossaryTerm = pgTable("glossary_term", {
  id: text("id").primaryKey(),
  term: text("term").notNull().unique(),
  definition: text("definition").notNull(),
});

// ============================================
// CREDIT CHECKLIST
// ============================================

export const creditChecklistItem = pgTable(
  "credit_checklist_item",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    stepIndex: integer("step_index").notNull(),
    checked: boolean("checked").default(false).notNull(),
  },
  (t) => [index("credit_checklist_userId_idx").on(t.userId)],
);

// ============================================
// EDUCATION PROGRESS
// ============================================

export const educationProgress = pgTable(
  "education_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    topic: text("topic").notNull(),
    completed: boolean("completed").default(false).notNull(),
    completedAt: timestamp("completed_at"),
  },
  (t) => [
    index("education_progress_userId_idx").on(t.userId),
    index("education_progress_userId_topic_idx").on(t.userId, t.topic),
  ],
);

// ============================================
// RELATIONS
// ============================================

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, { fields: [userProfile.userId], references: [user.id] }),
}));

export const householdRelations = relations(household, ({ one, many }) => ({
  user: one(user, { fields: [household.userId], references: [user.id] }),
  members: many(householdMember),
}));

export const householdMemberRelations = relations(householdMember, ({ one }) => ({
  household: one(household, {
    fields: [householdMember.householdId],
    references: [household.id],
  }),
}));

export const budgetRelations = relations(budget, ({ one, many }) => ({
  user: one(user, { fields: [budget.userId], references: [user.id] }),
  lines: many(budgetLine),
}));

export const budgetLineRelations = relations(budgetLine, ({ one }) => ({
  budget: one(budget, { fields: [budgetLine.budgetId], references: [budget.id] }),
}));

export const netWorthRelations = relations(netWorth, ({ one }) => ({
  user: one(user, { fields: [netWorth.userId], references: [user.id] }),
}));

export const goalRelations = relations(goal, ({ one }) => ({
  user: one(user, { fields: [goal.userId], references: [user.id] }),
}));

export const taskRelations = relations(task, ({ one }) => ({
  user: one(user, { fields: [task.userId], references: [user.id] }),
}));

export const journalEntryRelations = relations(journalEntry, ({ one }) => ({
  user: one(user, { fields: [journalEntry.userId], references: [user.id] }),
}));

export const sleepOnItRelations = relations(sleepOnIt, ({ one }) => ({
  user: one(user, { fields: [sleepOnIt.userId], references: [user.id] }),
}));

export const sleepOnItTrackerRelations = relations(sleepOnItTracker, ({ one, many }) => ({
  user: one(user, { fields: [sleepOnItTracker.userId], references: [user.id] }),
  items: many(sleepOnItTrackerItem),
}));

export const sleepOnItTrackerItemRelations = relations(sleepOnItTrackerItem, ({ one }) => ({
  tracker: one(sleepOnItTracker, {
    fields: [sleepOnItTrackerItem.trackerId],
    references: [sleepOnItTracker.id],
  }),
}));

export const focusRelations = relations(focus, ({ one }) => ({
  user: one(user, { fields: [focus.userId], references: [user.id] }),
}));

export const favoriteTipRelations = relations(favoriteTip, ({ one }) => ({
  user: one(user, { fields: [favoriteTip.userId], references: [user.id] }),
}));

export const creditChecklistItemRelations = relations(creditChecklistItem, ({ one }) => ({
  user: one(user, { fields: [creditChecklistItem.userId], references: [user.id] }),
}));

export const educationProgressRelations = relations(educationProgress, ({ one }) => ({
  user: one(user, { fields: [educationProgress.userId], references: [user.id] }),
}));
