import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function connect_db() {
    await prisma.$connect()
        
} 

export default prisma