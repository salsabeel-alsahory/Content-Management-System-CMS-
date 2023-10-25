"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = exports.Video = exports.Content = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
const Tag_1 = require("./Tag");
let Content = class Content extends typeorm_1.BaseEntity {
    // Custom method to get the content ID
    getContentId() {
        return this.id;
    }
    async like() {
        this.likes++;
        await this.save();
        return this;
    }
};
exports.Content = Content;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Content.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Content.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Category_1.Category, category => category.contents),
    __metadata("design:type", Category_1.Category)
], Content.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => Tag_1.Tag),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Content.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }) // Default value is 0
    ,
    __metadata("design:type", Number)
], Content.prototype, "likes", void 0);
exports.Content = Content = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({ column: { type: "varchar", name: "content_type" } })
], Content);
let Video = class Video extends Content {
    async like() {
        await super.like();
        return this;
    }
};
exports.Video = Video;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Video.prototype, "videoUrl", void 0);
exports.Video = Video = __decorate([
    (0, typeorm_1.Entity)()
], Video);
let Article = class Article extends Content {
    async like() {
        await super.like();
        return this;
    }
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Article.prototype, "articleContent", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)()
], Article);
