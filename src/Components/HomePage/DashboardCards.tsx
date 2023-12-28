import React from "react";
import { Stack, Avatar, SvgIcon } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


interface DashboardCardsProps {
    amount: number;
    title: string;
  }
function DashboardCards(props : DashboardCardsProps) {

    const { amount,title } = props;

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h4">{amount}</Typography>

        <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

export default DashboardCards;
