CREATE DATABASE LMS
GO

USE LMS
GO

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
	[UserId] [nvarchar](128) NOT NULL,
	[BookId] [int] NOT NULL,
	[Status] [VARCHAR](20) NOT NULL,
	[OrderDate] [date] NOT NULL,
	[ReturnDate] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
))

ALTER TABLE [dbo].[OrderTable]  WITH CHECK ADD FOREIGN KEY([BookId])
REFERENCES [dbo].[Book] ([BookId])

ALTER TABLE [dbo].[OrderTable]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])

ALTER TABLE [dbo].[Book]
ADD UNIQUE ([BookName],[Author]);

CREATE TABLE [dbo].[Wishlist](
	[WishListId] [int] NOT NULL PRIMARY KEY IDENTITY(1,1),
	[UserId] [nvarchar](128) NOT NULL,
	[BookId] [int] NOT NULL,
	[OrderDate] [date] NOT NULL,
	);

ALTER TABLE [dbo].[Wishlist]  WITH CHECK ADD FOREIGN KEY([BookId])
REFERENCES [dbo].[Book] ([BookId])

ALTER TABLE [dbo].[Wishlist]  WITH CHECK ADD FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])