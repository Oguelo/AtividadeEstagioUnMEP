"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./useCart";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Divider from "@/app/components/Divider";
import { useRouter } from "next/navigation";

const Cart = () => {
    const total = 1564;

    const { cartItems } = useCart();

    const router = useRouter();

    if (!cartItems || cartItems.length == 0) {
        return (
            <Grid container justifyContent={"center"}>
                <Typography variant="body1" fontSize={20}>
                    Carrinho Vazio
                </Typography>
                <Grid container justifyContent={"center"}>
                    <Link href={"/"}>
                        <Typography variant="body2">Vamos as Compras</Typography>
                    </Link>
                </Grid>
            </Grid>
        );
    }
    return (
        <Container maxWidth={false}>
            <Grid container mt={4}>
                <Grid xs={9} container item sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}>
                    <Grid xs={12} p={2} item>
                        <Typography variant="h4" color="dark.main" fontWeight="bold">
                            Carrinho
                        </Typography>
                        <Divider width="25%" />
                    </Grid>
                    <Grid xs={12} item p={2}>
                        <Box sx={{ borderRadius: 5, backgroundColor: "#fff" }}>
                            <Grid container xs={12} p={2}>
                                {cartItems.map((item) => {
                                    return (
                                        <Grid
                                            mb={2}
                                            item
                                            xs={12}
                                            key={item.id}
                                            container
                                            p={2}
                                            sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}
                                        >
                                            <Grid xs={3} item>
                                                <div style={{ width: "100%", height: 250, position: "relative", borderRadius: 5 }}>
                                                    <Image
                                                        src="https://cdn.kobo.com/book-images/6750d058-29cb-4626-9c12-a62e816a80cc/1200/1200/False/harry-potter-and-the-philosopher-s-stone-3.jpg"
                                                        fill
                                                        alt="Ebook cover"
                                                        objectFit="cover"
                                                        style={{ borderRadius: 5 }}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid xs={7} item p={2} alignSelf="center">
                                                <Typography color="dark.main" variant="h5" fontWeight="bold">
                                                    {item.title}
                                                </Typography>
                                                <Typography color="dark.main">{item.author}</Typography>
                                                <Typography>{item.price.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</Typography>
                                            </Grid>
                                            <Grid xs={2} item textAlign="right" alignSelf="end">
                                                <Button color="error" variant="contained">
                                                    Remover
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid xs={3} item container pl={2}>
                    <Grid xs={12} item>
                        <Box p={2} sx={{ backgroundColor: "secondary.main", borderRadius: 5 }}>
                            <Grid xs={12} item container sx={{ backgroundColor: "#FFF", borderRadius: 5 }} p={2}>
                                <Grid xs={12} item container textAlign={"center"} my={6}>
                                    <Grid item xs={12}>
                                        <Typography color="primary" variant="h6">
                                            Valor dos produtos:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="primary">
                                            {total.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider width="90%" style={{ margin: "auto" }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href="/">Continuar comprando</Link>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item textAlign="center">
                                    <Button onClick={() => {
                                        router.push('/pagamento');
                                    }} color="primary" variant="contained" startIcon={<ShoppingCartCheckoutIcon />}>
                                        Finalizar compra
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;