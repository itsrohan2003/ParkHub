create database parkhub;
use parkhub;
CREATE TABLE arrivals (
    serial_number INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    vehicle_number VARCHAR(15) NOT NULL
);
CREATE TABLE ParkingAreas (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    spots_available INT NOT NULL
);
insert into ParkingAreas values(001,"AB1","near the cctv building",5);
select*from ParkingAreas;
insert into ParkingAreas values(002,"Main Gate Parking","in front of the main gate",5);

CREATE TABLE ParkingSpots (
    spotID INT PRIMARY KEY,
    areaID INT,
    availability INT DEFAULT 0,
    FOREIGN KEY (areaID) REFERENCES ParkingAreas(id)
);
ALTER TABLE ParkingSpots
ADD COLUMN name VARCHAR(255) DEFAULT '',
ADD COLUMN vehicleNumber VARCHAR(20) DEFAULT '',
ADD COLUMN contactNumber VARCHAR(15) DEFAULT '';
-- Insert spots for Parking Area 001
INSERT INTO ParkingSpots (spotID, areaID, availability) VALUES
('001001', 001, 0),
('001002', 001, 0),
('001003', 001, 0),
('001004', 001, 0),
('001005', 001, 0);

-- Insert spots for Parking Area 002
INSERT INTO ParkingSpots (spotID, areaID, availability) VALUES
('002001', 002, 0),
('002002', 002, 0),
('002003', 002, 0),
('002004', 002, 0),
('002005', 002, 0);
select * from ParkingSpots;
select * from ParkingSpots where areaID=001;
select * from arrivals;
delete * from ParkingSpots;
delete from ParkingSpots;