import { audience } from './data/audience.js'
import { department } from './data/department.js'
import { institute } from './data/institute.js'
import { occupation } from './data/occupation.js'
import { products } from './data/products.js'
import { rewardCategory } from './data/rewardCategory.js'
import { sex } from './data/sex.js'
import { sponsor } from './data/sponsor.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {

    const seedAudience = await prisma.ageCategory.createMany({
        data: audience,
        skipDuplicates: false,
    })

    const seedSponsor = await prisma.sponsor.createMany({
        data: sponsor,
        skipDuplicates: false,
    })

    const seedDepartment = await prisma.department.createMany({
        data: department,
        skipDuplicates: false,
    })

    const seedInstitute = await prisma.institute.createMany({
        data: institute,
        skipDuplicates: false,
    })

    const seedOccupation = await prisma.occupation.createMany({
        data: occupation,
        skipDuplicates: false,
    })

    const seedRewardCategory = await prisma.rewardCategories.createMany({
        data: rewardCategory,
        skipDuplicates: false,
    })

    const sexGender = await prisma.sex.createMany({
        data: sex,
        skipDuplicates: false,
    })

    const seedProducts = await prisma.product.createMany({
        data: products,
        skipDuplicates: false,
    })

}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

