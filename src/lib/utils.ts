import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Valida um endereço de e-mail
 * @param email - O e-mail a ser validado
 * @returns boolean - Retorna true se o e-mail for válido
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Formata um número de telefone no formato brasileiro
 * @param phone - O número de telefone a ser formatado
 * @returns string - O número formatado
 */
export function formatPhoneNumber(phone: string): string {
  // Remove tudo que não for dígito
  const cleaned = phone.replace(/\D/g, '');
  
  // Formatação para celular (XX) XXXXX-XXXX
  if (cleaned.length <= 11) {
    return cleaned
      .replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, ddd, part1, part2) => {
        let result = ddd ? `(${ddd}` : '';
        if (part1) result += `) ${part1}`;
        if (part2) result += `-${part2}`;
        return result;
      });
  }
  
  // Retorna sem formatação se não for possível formatar
  return phone;
}

/**
 * Valida um número de telefone brasileiro
 * @param phone - O número de telefone a ser validado
 * @returns boolean - Retorna true se o telefone for válido
 */
export function validatePhoneNumber(phone: string): boolean {
  // Remove tudo que não for dígito
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem o número correto de dígitos para celular (com DDD)
  return cleaned.length === 11;
}
