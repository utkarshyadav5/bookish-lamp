CREATE DATABASE LMS
GO

USE LMS
GO

CREATE TABLE [dbo].[Role](
	[RoleId] [int] NOT NULL,
	[Role] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
);
