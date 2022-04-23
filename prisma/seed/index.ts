import { LsmdAdmSectUmdCreateInput } from '@generated/index';

import { busanSeed } from './busan';
import { PrismaClient, Prisma } from '@prisma/client'
import { chungbukSeed } from './chungbuk';
import { chungnamSeed } from './chungnam';
import { daeguSeed } from './daegu';
import { daejeonSeed } from './daejeon';
import { gangwonSeed } from './gangwon';
import { gwangjuSeed } from './gwangju';
import { gyeonggiSeed } from './gyeonggi';
import { gyeongnamSeed } from './gyeongnam';
import { gyeongsangbukDoSeed } from './gyeongsangbuk';
import { incheonSeed } from './incheon';
import { jejuSeed } from './jeju';
import { jeonbukSeed } from './jeonbuk';
import { jeonnamSeed } from './jeonnam';
import { sejongSeed } from './sejong';
import { seoulSeed } from './seoul';
import { ulsanSeed } from './ulsan';

const prisma = new PrismaClient()
const main = async () => {
  const data: LsmdAdmSectUmdCreateInput[] = [
    ...busanSeed,
    ...chungbukSeed,
    ...chungnamSeed,
    ...daeguSeed,
    ...daejeonSeed,
    ...gangwonSeed,
    ...gwangjuSeed,
    ...gyeonggiSeed,
    ...gyeongnamSeed,
    ...gyeongsangbukDoSeed,
    ...incheonSeed,
    ...jejuSeed,
    ...jeonbukSeed,
    ...jeonnamSeed,
    ...sejongSeed,
    ...seoulSeed,
    ...ulsanSeed,
  ];
  console.log('data', data.length)

  await prisma.lsmdAdmSectUmd.createMany({
    data
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })