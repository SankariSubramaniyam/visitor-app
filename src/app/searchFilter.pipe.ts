import { Visit } from './models/visit.model';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'srchFilterPipe',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: Visit[], searchVisitObj: Visit): any[] {
    if(!items) return [];
    if(searchVisitObj == undefined || searchVisitObj==null) return items;
    
    let srchTxt  = "";
    if(searchVisitObj.filter_string != undefined || searchVisitObj.filter_string != null)
        srchTxt  = searchVisitObj.filter_string.toLowerCase();
    

    return items.filter( visit => {
      return (
            (visit.visit_id.toString().includes(srchTxt) ||
            visit.visitor_name.toLowerCase().includes(srchTxt) ||
            visit.visitor_org.toLowerCase().includes(srchTxt)   ||
            visit.visitor_desg.toLowerCase().includes(srchTxt)  ||
            visit.to_visit.toLowerCase().includes(srchTxt)      ||
            (visit.visitor_org.toLowerCase().concat(",").concat(visit.visitor_desg.toLowerCase())).includes(srchTxt)  
            ) &&
            visit.visit_date.includes(searchVisitObj.visit_date) &&
            visit.to_visit.toLowerCase().includes(searchVisitObj.to_visit.toLowerCase()) &&
            (visit.visitor_status == searchVisitObj.visitor_status || searchVisitObj.visitor_status==999)
        );
    });
  } 
}