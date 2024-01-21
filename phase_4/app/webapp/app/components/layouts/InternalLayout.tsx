"use client";

import Link from "next/link";
import React, { useState } from "react";
import AccountHeader from "../AccountHeader";
import { UserLevel } from "@/app/interfaces/User";
import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Discount, Groups, Home, LibraryBooks, Logout, Person, SubdirectoryArrowRight } from "@mui/icons-material";

export default function InternalLayout({ children }: { children: React.ReactNode }) {
    
    const name = "";
    const avatarSrc =
        "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg";



   
    return (
        <Container
            maxWidth={false}
            disableGutters={true}
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1E3345",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "90%",
                    height: "85%",
                    borderRadius: 6,
                    overflow: "hidden",
                    backgroundColor: "#F1F1F1",
                }}
            >
                <Grid
                    container
                    sx={{
                        height: "100%",
                    }}
                >
                    <Grid
                        sx={{
                            height: "100%",
                            backgroundColor: "#fff",
                            paddingTop: 2,
                        }}
                        sm={3}
                        item
                    >
                        <Grid container sx={{ height: "100%" }}>
                          
                            <Grid item xs={12} sx={{ textAlign: "center", paddingY: 1.5 }}>
                                <Avatar sx={{ margin: "auto", width: 56, height: 56 }} src={avatarSrc} />
                                <Typography variant="h4" color="darker">
                                    Lista de Tarefas
                                </Typography>
                               
                            </Grid>
                         
                            
                        </Grid>
                    </Grid>
                    <Grid item sm={9} sx={{ overflowY: "scroll", height: "100%" }}>
                        <Container maxWidth={false} sx={{ py: 2 }}>
                            {children}
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
