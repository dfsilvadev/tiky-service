/* eslint-disable no-console */
import { hash } from "bcryptjs";

import { Role } from "../src/generated/prisma/enums";
import { prismaClient } from "../src/infrastructure/persistence/prisma/prisma-client";

async function main() {
  console.log("🌱 Iniciando o Seed do Banco de Dados do Tiky...");

  const defaultPasswordHash = await hash("Senha@123", 8);

  const admin = await prismaClient.account.upsert({
    where: { email: "admin@tiky.com" },
    update: {},
    create: {
      name: "Responsável",
      email: "admin@tiky.com",
      passwordHash: defaultPasswordHash,
      role: Role.ADMIN
    }
  });

  const player = await prismaClient.account.upsert({
    where: { email: "jogador@tiky.com" },
    update: {},
    create: {
      name: "Jogador Principal",
      email: "jogador@tiky.com",
      passwordHash: defaultPasswordHash,
      role: Role.PLAYER
    }
  });

  console.log("👤 Usuários verificados/criados com sucesso!");
  console.log(`👉 Admin: ${admin.email}`);
  console.log(`👉 Player: ${player.email}`);

  const existingRewardsCount = await prismaClient.reward.count();

  if (existingRewardsCount === 0) {
    await prismaClient.reward.createMany({
      data: [
        {
          title: "1h Extra de Videogame",
          description: "Aproveite 60 minutos a mais no seu jogo favorito.",
          xpCost: 50
        },
        {
          title: "Vale Sorvete",
          description: "Troque por um sorvete de casquinha no fim de semana.",
          xpCost: 150
        },
        {
          title: "Escolher o Filme da Noite",
          description: "Você decide o que vamos assistir na noite de cinema.",
          xpCost: 300
        }
      ]
    });

    console.log("🎁 Prêmios da Loja criados com sucesso!");
  } else {
    console.log("🎁 Prêmios já existem no banco. Pulando criação.");
  }

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
