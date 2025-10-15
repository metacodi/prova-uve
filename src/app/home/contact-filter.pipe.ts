import { Pipe, PipeTransform } from "@angular/core";
import { Contact } from './contact.type';

@Pipe({
    name: 'filter',
    pure: false,
  standalone: false,
})
export class ContactFilterPipe implements PipeTransform {
  private debug = false;


  transform(rows: Contact[], match: string): Contact[] {
    // Si no hay elementos, no hay nada que filtrar...
    if (!rows) { return rows; }
    if (!Array.isArray(rows)) { return rows; }

    match = match.toLowerCase();

    return rows.filter(row => {
      return row.name.toLowerCase().includes(match) || row.username.toLowerCase().includes(match) || row.email.toLowerCase().includes(match) || row.phone.toLowerCase().includes(match);
    })
  }

}
