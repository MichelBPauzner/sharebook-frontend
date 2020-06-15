import { CategoryService } from './../../../core/services/category/category.service';
import { BookService } from './../../../core/services/book/book.service';
import { UserService } from './../../../core/services/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadModule } from 'ng2-imageupload';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2ImgMaxService, ImgMaxSizeService, ImgExifService, ImgMaxPXSizeService } from 'ng2-img-max';
import { Ng2PicaService, ImgExifService as ImgPicaService } from 'ng2-pica';

import { FormComponent } from './form.component';

import { AppConfigModule } from '../../../app-config.module';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let userService: UserService;
  let bookService: BookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ImageUploadModule,
        NgbModule,
        NgbModalModule,
        RouterTestingModule,
        AppConfigModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        Ng2ImgMaxService,
        ImgMaxSizeService,
        ImgExifService,
        ImgMaxPXSizeService,
        Ng2PicaService,
        ImgPicaService,
        UserService,
        BookService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    bookService = TestBed.get(BookService);
    spyOn(userService, 'getProfile').and.returnValue(of({ profile: 'User' }));
    spyOn(bookService, 'getFreightOptions').and.returnValue(
      of([
        { value: 'City', text: 'Cidade' },
        { value: 'State', text: 'Estado' },
        { value: 'Country', text: 'País' },
        { value: 'World', text: 'Mundo' },
        { value: 'WithoutFreight', text: 'Não' },
      ])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Quero doar um livro');
  });

  it('should render create form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[id="userId"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="title"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="author"]')).toBeTruthy();
    expect(compiled.querySelector('select[id="categoryId"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="userIdFacilitator"]')).toBeFalsy();
    expect(compiled.querySelector('input[id="imageName"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="freightOption"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[id="synopsis"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="agreeToTerms"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="submit"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="submit"]').value).toBe('Doar este livro');
  });

  it('bookId field validity', () => {
    const bookId = component.formGroup.controls['bookId'];
    expect(bookId.valid).toBeTruthy();

    bookId.setValue('A'.repeat(5));
    expect(bookId.valid).toBeTruthy();
  });

  it('title field validity', () => {
    const title = component.formGroup.controls['title'];
    expect(title.valid).toBeFalsy();

    title.setValue('');
    expect(title.hasError('required')).toBeTruthy();

    title.setValue('A');
    expect(title.hasError('minlength')).toBeTruthy();

    title.setValue('A'.repeat(201));
    expect(title.hasError('maxlength')).toBeTruthy();

    title.setValue('A'.repeat(5));
    expect(title.valid).toBeTruthy();
  });

  it('author field validity', () => {
    const author = component.formGroup.controls['author'];
    expect(author.valid).toBeFalsy();

    author.setValue('');
    expect(author.hasError('required')).toBeTruthy();

    author.setValue('A');
    expect(author.hasError('minlength')).toBeTruthy();

    author.setValue('A'.repeat(201));
    expect(author.hasError('maxlength')).toBeTruthy();

    author.setValue('A'.repeat(5));
    expect(author.valid).toBeTruthy();
  });

  it('categoryId field validity', () => {
    const categoryId = component.formGroup.controls['categoryId'];
    expect(categoryId.valid).toBeFalsy();

    categoryId.setValue('');
    expect(categoryId.hasError('required')).toBeTruthy();

    categoryId.setValue('A'.repeat(5));
    expect(categoryId.valid).toBeTruthy();
  });

  it('userIdFacilitator field validity', () => {
    const userIdFacilitator = component.formGroup.controls['userIdFacilitator'];
    expect(userIdFacilitator.valid).toBeTruthy();

    userIdFacilitator.setValue('A'.repeat(5));
    expect(userIdFacilitator.valid).toBeTruthy();
  });

  it('userId field validity', () => {
    const userId = component.formGroup.controls['userId'];
    expect(userId.valid).toBeFalsy();

    userId.setValue('');
    expect(userId.hasError('required')).toBeTruthy();

    userId.setValue('A'.repeat(5));
    expect(userId.valid).toBeTruthy();
  });

  it('freightOption field validity', () => {
    const freightOption = component.formGroup.controls['freightOption'];
    expect(freightOption.valid).toBeFalsy();

    freightOption.setValue('');
    expect(freightOption.hasError('required')).toBeTruthy();

    freightOption.setValue('A'.repeat(5));
    expect(freightOption.valid).toBeTruthy();
  });

  it('imageBytes field validity', () => {
    const imageBytes = component.formGroup.controls['imageBytes'];
    expect(imageBytes.valid).toBeTruthy();

    imageBytes.setValue('A'.repeat(5));
    expect(imageBytes.valid).toBeTruthy();
  });

  it('imageName field validity', () => {
    const imageName = component.formGroup.controls['imageName'];
    expect(imageName.valid).toBeTruthy();

    const input = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;

    spyOn(component, 'onConvertImageToBase64');
    input.dispatchEvent(new Event('imageSelected'));
    expect(component.onConvertImageToBase64).toHaveBeenCalled();
  });

  it('approve field validity', () => {
    const approve = component.formGroup.controls['approve'];
    expect(approve.valid).toBeTruthy();

    approve.setValue('A'.repeat(5));
    expect(approve.valid).toBeTruthy();
  });

  it('imageUrl field validity', () => {
    const imageUrl = component.formGroup.controls['imageUrl'];
    expect(imageUrl.valid).toBeTruthy();

    imageUrl.setValue('A'.repeat(5));
    expect(imageUrl.valid).toBeTruthy();
  });

  it('imageSlug field validity', () => {
    const imageSlug = component.formGroup.controls['imageSlug'];
    expect(imageSlug.valid).toBeTruthy();

    imageSlug.setValue('A'.repeat(5));
    expect(imageSlug.valid).toBeTruthy();
  });

  it('synopsis field validity', () => {
    const synopsis = component.formGroup.controls['synopsis'];
    expect(synopsis.valid).toBeTruthy();

    synopsis.setValue('A'.repeat(2001));
    expect(synopsis.hasError('maxlength')).toBeTruthy();

    synopsis.setValue('A'.repeat(5));
    expect(synopsis.valid).toBeTruthy();
  });

  it('agreeToTerms field validity', () => {
    const agreeToTerms = component.formGroup.controls['agreeToTerms'];
    expect(agreeToTerms.valid).toBeFalsy();

    agreeToTerms.setValue(true);
    expect(agreeToTerms.valid).toBeTruthy();
  });
});

describe('FormComponent Editing book', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let userService: UserService;
  let bookService: BookService;
  let categoyService: CategoryService;

  const bookObject = {
    id: '1c31d9c2-54e6-4d69-094d-08d80b184d9b',
    title: 'TESTE AWS DEV',
    author: 'test',
    winner: '',
    donor: 'Vagner',
    userIdFacilitator: '54338afc-7674-46a3-9e35-1f8babd99d6b',
    facilitator: 'Cussa',
    facilitatorNotes: null,
    phoneDonor: '(22) 98831-7391',
    daysInShowcase: 5,
    totalInterested: 0,
    status: 'Available',
    trackingNumber: null,
    creationDate: '2020-06-07T12:23:48.3085349',
    chooseDate: '2020-06-16T00:00:00',
    freightOption: 'World',
    categoryId: '15395d99-6077-4cce-ba00-e99beffc628e',
    category: 'Informática',
    imageSlug: 'teste-aws-dev.jpeg',
    imageUrl: 'http://dev.sharebook.com.br/Images/Books/teste-aws-dev.jpeg',
    city: 'São Paulo',
    state: 'SP',
    synopsis: 'Livro de teste sobre AWS.',
    slug: 'teste-aws-dev',
    userId: '41de867c-b1b6-413d-b8b0-5427d907ef0d',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ImageUploadModule,
        NgbModule,
        NgbModalModule,
        RouterTestingModule,
        AppConfigModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        Ng2ImgMaxService,
        ImgMaxSizeService,
        ImgExifService,
        ImgMaxPXSizeService,
        Ng2PicaService,
        ImgPicaService,
        UserService,
        BookService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'f4816313-523b-4d61-89f1-08d80b14fdaf' }),
          },
        },
        CategoryService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    bookService = TestBed.get(BookService);
    categoyService = TestBed.get(CategoryService);
    spyOn(userService, 'getProfile').and.returnValue(of({ profile: 'Administrator' }));
    spyOn(userService, 'getAllFacilitators').and.returnValue(
      of([
        {
          id: '54338afc-7674-46a3-9e35-1f8babd99d6b',
          name: 'Cussa (3)',
          email: null,
          linkedin: null,
          phone: null,
          address: null,
        },
        {
          id: '41de867c-b1b6-413d-b8b0-5427d907ef0d',
          name: 'Vagner (1)',
          email: null,
          linkedin: null,
          phone: null,
          address: null,
        },
      ])
    );
    spyOn(bookService, 'getFreightOptions').and.returnValue(
      of([
        { value: 'City', text: 'Cidade' },
        { value: 'State', text: 'Estado' },
        { value: 'Country', text: 'País' },
        { value: 'World', text: 'Mundo' },
        { value: 'WithoutFreight', text: 'Não' },
      ])
    );
    spyOn(categoyService, 'getAll').and.returnValue(
      of([
        {
          name: 'Administração',
          id: '95f5dc4a-1dff-4f70-92e1-e1c8a150886b',
          creationDate: '2020-06-02T21:52:10.295309',
        },
        { name: 'Artes', id: '0f6be317-a61b-48e5-b532-d68a77276a0f', creationDate: '2020-06-02T21:52:10.295317' },
        { name: 'Aventura', id: '0c756650-a9d9-47e1-96cf-c525db7a56b5', creationDate: '2020-06-02T21:52:10.29531' },
        {
          name: 'Ciências Biógicas',
          id: 'ce090294-2eb6-413b-9c8e-3fd3d289a282',
          creationDate: '2020-06-02T21:52:10.295314',
        },
        { name: 'Direito', id: 'c96359b6-66a8-4a44-a443-d5211ee01bbd', creationDate: '2020-06-02T21:52:10.295299' },
        {
          name: 'Engenharia',
          id: 'b2b4090c-8f9a-46a2-babe-35eef55296b4',
          creationDate: '2020-06-02T21:52:10.295312',
        },
        {
          name: 'Geografia e História',
          id: '398262a0-8e9c-465f-bbb2-b5443bcca2df',
          creationDate: '2020-06-02T21:52:10.295315',
        },
        {
          name: 'Informática',
          id: '15395d99-6077-4cce-ba00-e99beffc628e',
          creationDate: '2020-06-02T21:52:10.295321',
        },
        { name: 'Medicina', id: '5e51347a-088e-4dc4-9bcb-be2b2c3f0179', creationDate: '2020-06-02T21:52:10.295318' },
        {
          name: 'Psicologia',
          id: '163ddbc5-02a3-4e28-b275-deb54ad3c4b4',
          creationDate: '2020-06-02T21:52:10.295307',
        },
      ])
    );
    spyOn(bookService, 'getById').and.returnValue(of(bookObject));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Editar livro');
  });

  it('should render edit form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[id="userId"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="title"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="author"]')).toBeTruthy();
    expect(compiled.querySelector('select[id="categoryId"]')).toBeTruthy();
    expect(compiled.querySelector('select[id="userIdFacilitator"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="imageName"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="freightOption"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[id="synopsis"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="agreeToTerms"]')).toBeFalsy();
    expect(compiled.querySelector('input[type="submit"]')).toBeTruthy();
  });

  it('should form has book values', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[id="userId"]').value).toBe(bookObject.userId);
    expect(compiled.querySelector('input[id="title"]').value).toBe(bookObject.title);
    expect(compiled.querySelector('input[id="author"]').value).toBe(bookObject.author);
    expect(compiled.querySelector('select[id="categoryId"]').value).toBe(bookObject.categoryId);
    expect(compiled.querySelector('select[id="userIdFacilitator"]').value).toBe(bookObject.userIdFacilitator);
    expect(compiled.querySelector('input[id="imageName"]').labels[0].innerText.trim()).toBe(bookObject.imageSlug);
    expect(compiled.querySelectorAll('#freightOptionLabel.active')[0].innerText.trim()).toBe('Mundo');
    expect(compiled.querySelector('textarea[id="synopsis"]').value).toBe(bookObject.synopsis);
    expect(compiled.querySelector('input[type="submit"]').value).toBe('Salvar');
  });
});
