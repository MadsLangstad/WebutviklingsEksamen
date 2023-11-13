﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebutviklingsEksamen.Contexts;

#nullable disable

namespace F1WebApi.Migrations
{
    [DbContext(typeof(F1Context))]
    [Migration("20231110111014_version10")]
    partial class version10
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.13");

            modelBuilder.Entity("WebutviklingsEksamen.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("DriverImage")
                        .HasColumnType("TEXT");

                    b.Property<int>("GrandsPrixEntered")
                        .HasColumnType("INTEGER");

                    b.Property<int>("HighestGridPosition")
                        .HasColumnType("INTEGER");

                    b.Property<string>("HighestRaceFinish")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("PlaceOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<int?>("Podiums")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Points")
                        .HasColumnType("REAL");

                    b.Property<string>("Team")
                        .HasColumnType("TEXT");

                    b.Property<int?>("WorldChampionships")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("WebutviklingsEksamen.Models.Race", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CircuitName")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfRace")
                        .HasColumnType("TEXT");

                    b.Property<string>("FastestLap")
                        .HasColumnType("TEXT");

                    b.Property<string>("GrandPrix")
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("RaceDuration")
                        .HasColumnType("TEXT");

                    b.Property<string>("WinnerName")
                        .HasColumnType("TEXT");

                    b.Property<double>("WinnerTime")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Races");
                });

            modelBuilder.Entity("WebutviklingsEksamen.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Base")
                        .HasColumnType("TEXT");

                    b.Property<string>("Chassis")
                        .HasColumnType("TEXT");

                    b.Property<string>("FastestLaps")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstTeamEntry")
                        .HasColumnType("TEXT");

                    b.Property<string>("FullTeamName")
                        .HasColumnType("TEXT");

                    b.Property<string>("HighestRaceFinish")
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<string>("PolePositions")
                        .HasColumnType("TEXT");

                    b.Property<string>("PowerUnit")
                        .HasColumnType("TEXT");

                    b.Property<string>("TeamChief")
                        .HasColumnType("TEXT");

                    b.Property<string>("TechnicalChief")
                        .HasColumnType("TEXT");

                    b.Property<string>("WorldChampionships")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });
#pragma warning restore 612, 618
        }
    }
}
