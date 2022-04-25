import { TradeCategory } from '@generated/models'
import prisma from '@libs/client'

export const findTradeCategoryById = async (
  categoryId: number
): Promise<TradeCategory | null> => {
  const category = await prisma.tradeCategory.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!category) {
    return null
  }

  return category
}
