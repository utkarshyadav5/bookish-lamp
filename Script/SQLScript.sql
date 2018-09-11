CREATE DATABASE LMS
GO

USE LMS
GO

CREATE TABLE [dbo].[Role](
	[RoleId] [int] NOT NULL  IDENTITY(1,1),
	[Role] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)); 


CREATE TABLE [dbo].[Account](
	[UserId] [int] NOT NULL  IDENTITY(1,1),
	[Name] [varchar](200) NOT NULL,
	[UserName] [varchar](200) NULL,
	[Email] [varchar](300) NULL,
	[Password] [varchar](300) NOT NULL,
	[UserRole] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
),
UNIQUE NONCLUSTERED 
(
	[Email] ASC
),
UNIQUE NONCLUSTERED 
(
	[UserName] ASC
))
ALTER TABLE [dbo].[Account]  WITH CHECK ADD FOREIGN KEY([UserRole])
REFERENCES [dbo].[Role] ([RoleId])

CREATE TABLE [dbo].[Book](
	[BookId] [int] NOT NULL IDENTITY(1,1),
	[BookName] [varchar](500) NOT NULL,
	[Author] [varchar](500) NOT NULL,
	[Genre] [varchar](500) NOT NULL,
	[Quantity] [int] NOT NULL,
	[AvailableNumber] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BookId] ASC
));

CREATE TABLE [dbo].[OrderTable](
	[OrderId] [int] NOT NULL IDENTITY(1,1),
	[UserId] [int] NOT NULL,
	[BookId] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[OrderDate] [date] NOT NULL,
	[ReturnDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
))

ALTER TABLE [dbo].[OrderTable]  WITH CHECK ADD FOREIGN KEY([BookId])
REFERENCES [dbo].[Book] ([BookId])

ALTER TABLE [dbo].[OrderTable]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[Account] ([UserId])

