-- CreateEnum
CREATE TYPE "InstanceStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'COMPLETED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "RecurrenceType" AS ENUM ('ONCE', 'DAILY', 'WEEKLY', 'INTERVAL');

-- CreateEnum
CREATE TYPE "RedemptionStatus" AS ENUM ('PENDING', 'DELIVERED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PLAYER');

-- CreateEnum
CREATE TYPE "TemplateStatus" AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('EARN', 'SPEND', 'BONUS', 'CASHOUT');

-- CreateEnum
CREATE TYPE "Weight" AS ENUM ('BASIC', 'IMPORTANT', 'EPIC');
