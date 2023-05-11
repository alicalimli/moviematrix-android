import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Image, View } from "react-native";

import CardDetails from "../components/card-details/CardDetails";

interface CardDetailsProps {}

const CardDetailsPage = ({}: CardDetailsProps) => {
  const { id } = useSearchParams();

  const mediaType = String(id).replace(/[0-9]/g, "");
  const newId = String(id).replace(/\D/g, "");

  return <CardDetails type={mediaType} id={newId} />;
};

export default CardDetailsPage;
