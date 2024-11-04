import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    if (!value) return '';

    // Remover etiquetas HTML
    const div = document.createElement('div');
    div.innerHTML = value;
    let text = div.textContent || div.innerText || '';

    // Limitar la longitud
    if (text.length > limit) {
      text = text.substring(0, limit) + '...';
    }

    return text;
  }

}